import StellarSdk from 'stellar-sdk';
import bcrypt from 'bcrypt';
import fetch from 'node-fetch';
import Admin from '../Models/Admin.js';
import { Server } from 'stellar-sdk/lib/horizon/server.js';
import jwt from 'jsonwebtoken'
import HotelBookingHistory from '../Models/HotelBookingHistory.js';
import TransportBookingHistory from '../Models/TransportBookingHistory.js';
import ToursBookingHistory from '../Models/ToursBookingHistory.js';
import UserStellarTransaction from '../Utils/UserTransaction.js';
const server = new Server("https://horizon-testnet.stellar.org");
let success = null;

export const createAdmin = async (req, res, next) => {

    let { name, email, phone, password, confirmPassword, addedTrips, addedHotels, addedTransports, handledTours, handledTransport, handledHotels } = req.body;
    //checking if signup credentials are empty or not 
    if ((name.trim() === "" || email.trim() === "" || phone === "" || password.trim() === "")) {
        return res.status(400).json({ success: false, message: "enter ur credentials first" });
    }
    //checking that confirm password matches the above set password
    if (confirmPassword !== password) {
        return res.status(400).json({ success: false, message: "passwords are not matching with each other" });
    }
    // fetching admin
    let admin = await req.admin;
    if (admin) {
        return res.status(400).json({ success: false, message: "admin with this info already exists", statusCode: 400 });
    }
    //hashing password 
    const hashedPassword = await bcrypt.hash(password, 10);

    //making stellar account
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
            return res.status(400).json({ success: false, message: "Failed to load account", statusCode: 400 });
        }
    }
    let Balance = 0;
    //check for the account balance of admin
    account.balances.forEach(function (balance) {
        if (balance.asset_type === 'native') {
            Balance = balance.balance;
        }
    });

    try { //creating new admin

        admin = new Admin({ name, email, phone, password: hashedPassword, addedTrips, addedHotels, addedTransports, handledTours, handledTransport, handledHotels, AccountId: sourceAccountId, SecretSeed: sourceSecretSeed, Balance })
        admin = await admin.save();
    } catch (error) {
        return next(error);
    }

    if (!admin) {
        //sending failed response
        return res.status(400).json({ success: false, message: "admin not found", statusCode: 400 });
    }
    //sending success response
    return res.status(200).json({ success: true, message: "Admin account created successfully", sourceAccountId, sourceSecretSeed, account, admin, statusCode: 200 });

};


export const adminLogin = async (req, res, next) => {

    let { email, password } = req.body;
    if (email.trim() === "" || password.trim() === "") {
        return res.status(400).json({ success: false, message: "enter ur credentials first", statusCode: 400 });
    }
    //fetching admin 
    let admin = await req.admin;
    const isCorrectPassword = bcrypt.compareSync(password, admin.password)

    if (!isCorrectPassword) {
        return res.status(400).json({ success: false, message: "wrong password", statusCode: 400 })
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {  //signing jwt token
        expiresIn: "7d"
    });
    return res.status(200).json({ success: true, message: "User signed in successfully", token: token, id: admin._id, admin: admin, statusCode: 200 })

}

//get all admins
export const getAdmins = async (req, res, next) => {
    //fetching admin
    let admin = await req.admin;
    return res.status(200).json({ success: true, message: "here are your all admins", admins: admin, statusCode: 200 })
}

export const addBalance = async (req, res, next) => {

    const { amount } = req.body;  //fetching data from request body
    //fetching admin
    let admin = await req.admin;

    const adminSecretKey = process.env.ADMIN_SECRET_SEED;
    //generating key pair
    const adminKeyPair = StellarSdk.Keypair.fromSecret(adminSecretKey);
    // Admin account's public key
    const adminPublicKey = adminKeyPair.publicKey();

    try {
        //getting admin account balance
        const account = await server.loadAccount(adminPublicKey);
        //checking account balance 
        let Balance = 0;
        account.balances.forEach(function (balance) {
            if (balance.asset_type === 'native') {
                Balance = balance.balance;
            }
        });

        try {
            let destinationAcc = admin.AccountId;
            let Amount = (Number.parseFloat(amount) / 32.15).toFixed(7);
            // Transaction to add balance to the admin account
            let response = await UserStellarTransaction(account, Amount, adminKeyPair, destinationAcc)

            // Reload account to get updated balance
            const updatedAccount = await server.loadAccount(destinationAcc);
            let updatedBalance;
            updatedAccount.balances.forEach(function (balance) {
                if (balance.asset_type === 'native') {
                    updatedBalance = balance.balance;
                }
            })
            const updatedMainAccount = await server.loadAccount(adminPublicKey);
            let updatedMainBalance;
            updatedMainAccount.balances.forEach(function (balance) {
                if (balance.asset_type === 'native') {
                    updatedMainBalance = balance.balance;
                }
            })
            let mainAdmin = await Admin.findOne({ AccountId: adminPublicKey })
            mainAdmin.Balance = updatedMainBalance;
            admin.Balance = updatedBalance;
            //saving admin
            await admin.save();
            await mainAdmin.save();
            return res.status(200).json({ success: true, message: "Admin account has been balanced successfully", Balance: updatedBalance, balanceDB: updatedBalance, statusCode: 400 });
        } catch (error) {
            return res.status(500).json({ success: false, message: "Transaction failed", error: error.response.data.extras.result_codes, statusCode: 500 });
        }
    } catch (error) {
        console.error('Error loading account or building transaction:', error);
        return res.status(500).json({ success: false, message: "Error loading account or building transaction", error: error, statusCode: 500 });
    }
};
export const checkBalance = async (req, res, next) => { //for checking admin stellar account balance
    // extracting token and validating admin
    let admin = req.admin;
    server.loadAccount(admin.AccountId)
        .then(account => {
            // Iterate through balances to find XLM balance
            let xlmBalance;
            account.balances.forEach(balance => {
                if (balance.asset_type === 'native') {
                    xlmBalance = balance.balance;
                }
            });
            if (xlmBalance == 0) {
                return res.status(400).json({ success: false, message: "Your Wallet is empty", error: error, statusCode: 400 });
            }
            return res.status(200).json({ success: true, message: "xlm balance is here:", Balance: xlmBalance, statusCode: 200 });
        })
        .catch(error => {
            return res.status(500).json({ success: false, message: "did'nt get balance", error: error, statusCode: 500 });
        });
}
export const HotelBookings = async (req, res, next) => {
    let HotelBookings;
    try {
        HotelBookings = await HotelBookingHistory.find(); //checking hotel bookings
    } catch (error) {
        return next(error);
    }

    if (!HotelBookings) {
        return res.status(400).json({ success: false, message: "no HotelBookings are here", statusCode: 400 })
    }
    return res.status(200).json({ success: true, message: "here are your all HotelBookings", HotelBookings: HotelBookings, statusCode: 200 })
}
export const TourBookings = async (req, res, next) => {

    let TourBookings; //checking Tour bookings
    try {
        TourBookings = await ToursBookingHistory.find();
    } catch (error) {
        return next(error);
    }

    if (!TourBookings) {

        return res.status(400).json({ success: false, message: "no TourBookings are here", statusCode: 400 })
    }


    return res.status(200).json({ success: true, message: "here are your all TourBookings", TourBookings: TourBookings, statusCode: 200 })
}

export const TransportBookings = async (req, res, next) => {

    //checking Transport Bookings
    let TransportBookings;
    try {
        TransportBookings = await TransportBookingHistory.find();
    } catch (error) {
        return next(error);
    }

    if (!TransportBookings) {
        return res.status(400).json({ success: false, message: "no TransportBookings are here", statusCode: 400 })
    }

    return res.status(200).json({ message: "here are your all TransportBookings", TransportBookings: TransportBookings, statusCode: 200 })
}

export const UserHotelBookings = async (req, res, next) => {

    //checking specific user hotel bookings
    let { bookerName } = req.body;

    let HotelBookings;
    try {
        HotelBookings = await HotelBookingHistory.find({ bookerName: bookerName });
    } catch (error) {
        return next(error);
    }

    if (!HotelBookings) {

        return res.status(400).json({ success, message: "no HotelBookings are here", statusCode: 400 })
    }
    return res.status(200).json({ message: "here are your all HotelBookings", HotelBookings: HotelBookings, statusCode: 200 })
}
export const UserTourBookings = async (req, res, next) => {

    //checking specific user Tour bookings
    let { bookerName } = req.body;
    let TourBookings;
    try {
        TourBookings = await ToursBookingHistory.find({ bookerName: bookerName });
    } catch (error) {
        return next(error);
    }

    if (!TourBookings) {

        return res.status(400).json({ success, message: "no TourBookings are here", statusCode: 400 })
    }

    success = true;
    return res.status(200).json({ message: "here are your all TourBookings", TourBookings: TourBookings, statusCode: 200 })
}

export const UserTransportBookings = async (req, res, next) => {

    //checking specific userTransport bookings
    let { bookerName } = req.body;

    let TransportBookings;
    try {
        TransportBookings = await TransportBookingHistory.find({ bookerName: bookerName });
    } catch (error) {
        return next(error);
    }

    if (!TransportBookings) {

        return res.status(400).json({ success: false, message: "no TransportBookings are here", statusCode: 400 })
    }

    success = true;
    return res.status(200).json({ message: "here are your all TransportBookings", TransportBookings: TransportBookings, statusCode: 200 })
}