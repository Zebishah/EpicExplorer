import StellarSdk from 'stellar-sdk';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import fetch from 'node-fetch';
import Admin from '../Models/Admin.js';
import { Server } from 'stellar-sdk/lib/horizon/server.js';
import jwt from 'jsonwebtoken'
const server = new Server("https://horizon-testnet.stellar.org");
let success = null;

export const createAdmin = async (req, res, next) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        const errorMessages = result.array().map(error => error.msg);
        return res.status(400).json({ success: false, error: errorMessages });
    } else {
        let { name, email, password, addedProducts } = req.body;

        let existingAdmin;
        existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const sourcePair = StellarSdk.Keypair.random();
        const sourceAccountId = sourcePair.publicKey();
        const sourceSecretSeed = sourcePair.secret();
        let account;
        try {
            account = await server.loadAccount(sourceAccountId);
        } catch (error) {
            if (error instanceof StellarSdk.NotFoundError) {
                // Account not found, create it using Friendbot
                try {
                    await fetch(`https://friendbot.stellar.org/?addr=${sourceAccountId}`);
                    // Retry loading the account
                    account = await server.loadAccount(sourceAccountId);
                } catch (friendbotError) {
                    return res.status(400).json({ success: false, message: "Failed to create account using Friendbot" });
                }
            } else {
                // Other error, handle as needed
                return res.status(400).json({ success: false, message: "Failed to load account" });
            }
        }
        let Balance = 0;
        account.balances.forEach(function (balance) {
            Balance = balance.balance;
        });
        // Continue with your code

        let admin;
        try {


            admin = new Admin({ name, email, password: hashedPassword, addedProducts, AccountId: sourceAccountId, SecretSeed: sourceSecretSeed, Balance })
            admin = await admin.save();
        } catch (error) {
            return next(error);
        }

        if (!admin) {
            return res.status(400).json({ success: false, message: "User not found" });
        }



        return res.status(200).json({ success: true, message: "Admin account created successfully", sourceAccountId, sourceSecretSeed, account });
    }
};

// Example usage





export const adminLogin = async (req, res, next) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        const errorMessages = result.array().map(error => error.msg);
        success = false;
        return res.status(400).json({ success, error: errorMessages });
    } else {
        let { email, password } = req.body;

        let existingAdmin;
        try {
            existingAdmin = await Admin.findOne({ email });
        } catch (error) {
            return next(error);
        }

        if (!existingAdmin) {
            success = false;
            return res.status(400).json({ success, message: "Unauthenticated login detected" })
        }
        const isCorrectPassword = bcrypt.compareSync(password, existingAdmin.password)

        if (!isCorrectPassword) {
            success = false;
            return res.status(400).json({ success, message: "user not found" })
        }
        const token = jwt.sign({ id: existingAdmin._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });
        success = true;
        return res.status(200).json({ success, message: "User signed in successfully", token: token, id: existingAdmin._id, admin: existingAdmin })
    }
}

//get all admins
export const getAdmins = async (req, res, next) => {
    const extractedToken = req.header("auth-token");
    let adminId;
    if (!extractedToken && extractedToken.trim() == "") {
        success = false;
        return res.status(400).json({ success, message: "No token found..." })
    }

    jwt.verify(extractedToken, process.env.JWT_SECRET, (err, decrypted) => {
        if (err) {
            success = false;
            return res.status(400).json({ success, message: "wrong one token is not authenticated...", error: err })
        }
        else {
            adminId = decrypted.id;
        }
    })
    let Admins;
    try {
        Admins = await Admin.find();
    } catch (error) {
        return next(error);
    }

    if (!Admins) {
        success = false;
        return res.status(400).json({ success, message: "no admins are here" })
    }

    success = true;
    return res.status(200).json({ message: "here are your all admins", admin: Admins })
}

let Balance = 0; // Initialize outside of the request handler

export const addBalance = async (req, res, next) => {
    const { amount } = req.body;

    const extractedToken = req.header("auth-token");
    let adminId;
    if (!extractedToken || extractedToken.trim() == "") {
        return res.status(400).json({ success: false, message: "No token found..." });
    }

    jwt.verify(extractedToken, process.env.JWT_SECRET, (err, decrypted) => {
        if (err) {
            return res.status(400).json({ success: false, message: "Token is not authenticated...", error: err });
        } else {
            adminId = decrypted.id;
        }
    });

    let admin_Find;
    try {
        admin_Find = await Admin.findById(adminId);
    } catch (error) {
        return next(error);
    }

    if (!admin_Find) {
        return res.status(400).json({ success: false, message: "No admins found" });
    }


    const adminSecretKey = admin_Find.SecretSeed;
    const adminKeypair = StellarSdk.Keypair.fromSecret(adminSecretKey);

    // Admin account's public key
    const adminPublicKey = adminKeypair.publicKey();


    try {
        const account = await server.loadAccount(adminPublicKey);

        let Balance = 0;
        account.balances.forEach(function (balance) {
            if (balance.asset_type === 'native') {
                Balance = balance.balance;
            }
        });


        // Transaction to add balance to the admin account

        console.log(adminPublicKey, adminKeypair)
        const transaction = new StellarSdk.TransactionBuilder(account, {
            fee: StellarSdk.BASE_FEE,
            networkPassphrase: StellarSdk.Networks.TESTNET
        })
            .addOperation(StellarSdk.Operation.payment({
                destination: adminPublicKey, // Admin account's public key
                asset: StellarSdk.Asset.native(),
                amount: amount.toString() // Amount of XLM to add to the admin account
            }))
            .setTimeout(180)
            .build();

        // Sign the transaction with the admin account's secret key
        transaction.sign(adminKeypair);

        try {
            // Submit the transaction to the testnet
            await server.submitTransaction(transaction);


            admin_Find.Balance = (parseFloat(Balance) + parseFloat(amount)).toFixed(5);

            await admin_Find.save();

            // Reload account to get updated balance
            const updatedAccount = await server.loadAccount(adminPublicKey);
            const updatedBalance = updatedAccount.balances.find(balance => balance.asset_type === 'native').balance;

            return res.status(200).json({ success: true, message: "Admin account has been balanced successfully", Balance: updatedBalance });
        } catch (error) {
            console.error('Transaction failed:', error.response.data.extras.result_codes);
            return res.status(500).json({ success: false, message: "Transaction failed", error: error });
        }
    } catch (error) {
        console.error('Error loading account or building transaction:', error);
        return res.status(500).json({ success: false, message: "Error loading account or building transaction", error: error });
    }
};
export const checkBalance = async (req, res, next) => {


    const extractedToken = req.header("auth-token");
    let adminId;
    if (!extractedToken || extractedToken.trim() == "") {
        return res.status(400).json({ success: false, message: "No token found..." });
    }

    jwt.verify(extractedToken, process.env.JWT_SECRET, (err, decrypted) => {
        if (err) {
            return res.status(400).json({ success: false, message: "Token is not authenticated...", error: err });
        } else {
            adminId = decrypted.id;
        }
    });

    let admin_Find;
    try {
        admin_Find = await Admin.findById(adminId);
    } catch (error) {
        return next(error);
    }

    if (!admin_Find) {
        return res.status(400).json({ success: false, message: "No admins found" });
    }
    server.loadAccount(admin_Find.AccountId)
        .then(account => {
            // Iterate through balances to find XLM balance
            let xlmBalance;
            account.balances.forEach(balance => {
                if (balance.asset_type === 'native') {
                    xlmBalance = balance.balance;
                }
            });
            return res.status(200).json({ success: true, message: "xlm balance is here:", Balance: xlmBalance });
        })
        .catch(error => {
            return res.status(500).json({ success: false, message: "did'nt get balance", error: error });
        });
}