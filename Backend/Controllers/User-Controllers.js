import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import StellarSdk from 'stellar-sdk';
import bcrypt from 'bcrypt';
import fetch from 'node-fetch';
import { Server } from 'stellar-sdk/lib/horizon/server.js';
const server = new Server("https://horizon-testnet.stellar.org");
import Product from '../Models/Product.js';
import User from '../Models/User.js';
import Admin from '../Models/Admin.js';
import dotenv from 'dotenv';
dotenv.config();

let success = null;
export const createUser = async (req, res, next) => {
    let balance = "2";
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const errorMessages = result.array().map(error => error.msg);
        return res.status(400).json({ success: false, error: errorMessages });
    }

    const { name, email, password, buyProducts, wishList } = req.body;

    try {
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const sourcePair = StellarSdk.Keypair.random();
        const sourceAccountId = sourcePair.publicKey();
        const sourceSecretSeed = sourcePair.secret();

        // Load admin account
        const adminAccountId = process.env.ADMIN_ACCOUNT_ID; // Replace with your admin account ID
        const adminAccount = await server.loadAccount(adminAccountId);

        // Create a transaction to fund the new user account
        const transaction = new StellarSdk.TransactionBuilder(adminAccount, {
            fee: StellarSdk.BASE_FEE,
            networkPassphrase: StellarSdk.Networks.TESTNET,
        })
            .addOperation(
                StellarSdk.Operation.createAccount({
                    destination: sourceAccountId, // New user's account ID
                    startingBalance: balance.toString(),
                    // Fund the account with 2.5 XLM
                })

            )
            .setTimeout(180)
            .build();

        // Sign the transaction with the admin's secret seed
        transaction.sign(StellarSdk.Keypair.fromSecret(process.env.ADMIN_SECRET_SEED)); // Replace with your admin's secret seed

        // Submit the transaction to the Stellar network
        await server.submitTransaction(transaction);


        // const pair = StellarSdk.Keypair.random();
        // const sourceAccountId = pair.publicKey();
        // const sourceSecretSeed = pair.secret();

        // (async function main() {
        //     try {
        //         // Create the new account using the Friendbot service
        //         const response = await fetch(
        //             `https://friendbot.stellar.org?addr=${encodeURIComponent(
        //                 sourceAccountId
        //             )}`,
        //         );
        //         const responseJSON = await response.json();
        //         console.log("SUCCESS! You have a new account :)\n", responseJSON);
        //     } catch (e) {
        //         console.error("ERROR!", e);
        //     }s
        // })();

        // Create the new user in your database
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            buyProducts,
            wishList,
            AccountId: sourceAccountId,
            SecretSeed: sourceSecretSeed,
            Balance: "0", // Set to 0 initially
        });
        await newUser.save();

        return res.status(200).json({ success: true, message: "User signed up successfully", user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ success: false, message: "Error creating user", error });
    }

}

export const userLogin = async (req, res, next) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        const errorMessages = result.array().map(error => error.msg);
        success = false;
        return res.status(400).json(success, { error: errorMessages });
    } else {
        let { email, password } = req.body;

        let existingUser;
        try {
            existingUser = await User.findOne({ email });
        } catch (error) {
            return next(error);
        }

        if (!existingUser) {
            success = false;
            return res.status(400).json({ success, message: "Unauthenticated login detected" })
        }
        const isCorrectPassword = bcrypt.compareSync(password, existingUser.password)

        if (!isCorrectPassword) {
            success = false;
            return res.status(400).json({ success, message: "user not found" })
        }
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });
        success = true;
        return res.status(200).json({ message: "User signed in successfully", token: token, id: existingUser._id, user: existingUser })
    }
}

//get all admins
export const getUsers = async (req, res, next) => {
    const extractedToken = req.header("auth-token");
    let adminId;
    if (!extractedToken || extractedToken.trim() === "") {
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
    let admins;
    try {
        admins = await Admin.findById(adminId);
    } catch (error) {
        return next(error);
    }
    if (admins) {
        let user;
        try {
            user = await User.find();
        } catch (error) {
            return next(error);
        }

        if (!user) {
            success = false;
            return res.status(400).json({ success, message: "no Users are here" })
        }
        success = true;
        return res.status(200).json({ success, message: "here are your all Users", user: user })
    }
    else {
        success = false;
        return res.status(400).json({ success, message: "unauthenticated admin" })
    }
}
export const checkUserBalance = async (req, res, next) => {


    const extractedToken = req.header("auth-token");
    let userId;
    if (!extractedToken || extractedToken.trim() == "") {
        return res.status(400).json({ success: false, message: "No token found..." });
    }

    jwt.verify(extractedToken, process.env.JWT_SECRET, (err, decrypted) => {
        if (err) {
            return res.status(400).json({ success: false, message: "Token is not authenticated...", error: err });
        } else {
            userId = decrypted.id;
        }
    });

    let user_Find;
    try {
        user_Find = await User.findById(userId);
    } catch (error) {
        return next(error);
    }

    if (!user_Find) {
        return res.status(400).json({ success: false, message: "No user found" });
    }

    server.loadAccount(user_Find.AccountId)
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




