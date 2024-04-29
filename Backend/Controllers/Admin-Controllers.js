import StellarSdk from 'stellar-sdk';
import { validationResult } from 'express-validator';
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
        return res.status(400).json({ success: false, message: "User already exists" });
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
            return res.status(400).json({ success: false, message: "Failed to load account" });
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
        return res.status(400).json({ success: false, message: "User not found" });
    }
    //sending success response
    return res.status(200).json({ success: true, message: "Admin account created successfully", sourceAccountId, sourceSecretSeed, account, admin });

};


export const adminLogin = async (req, res, next) => {

    let { email, password } = req.body;
    if (email.trim() === "" || password.trim() === "") {
        return res.status(400).json({ success: false, message: "enter ur credentials first" });
    }
    //fetching admin 
    let admin = await req.admin;

    const isCorrectPassword = bcrypt.compareSync(password, admin.password)

    if (!isCorrectPassword) {
        success = false;
        return res.status(400).json({ success, message: "user not found" })
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {  //signing jwt token
        expiresIn: "7d"
    });

    return res.status(200).json({ success: true, message: "User signed in successfully", token: token, id: admin._id, admin: admin })

}

//get all admins
export const getAdmins = async (req, res, next) => {
    //fetching admin
    let admin = await req.admin;


    return res.status(200).json({ success: true, message: "here are your all admins", admins: admin })
}

let Balance = 0; // Initialize outside of the request handler

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
            //updating admin Balance


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
            return res.status(200).json({ success: true, message: "Admin account has been balanced successfully", Balance: updatedBalance, balanceDB: updatedBalance });
        } catch (error) {

            return res.status(500).json({ success: false, message: "Transaction failed", error: error.response.data.extras.result_codes });
        }
    } catch (error) {
        console.error('Error loading account or building transaction:', error);
        return res.status(500).json({ success: false, message: "Error loading account or building transaction", error: error });
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
            return res.status(200).json({ success: true, message: "xlm balance is here:", Balance: xlmBalance });
        })
        .catch(error => {
            return res.status(500).json({ success: false, message: "did'nt get balance", error: error });
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
        success = false;
        return res.status(400).json({ success, message: "no HotelBookings are here" })
    }

    success = true;
    return res.status(200).json({ message: "here are your all HotelBookings", HotelBookings: HotelBookings })
}
export const TourBookings = async (req, res, next) => {

    let TourBookings; //checking Tour bookings
    try {
        TourBookings = await ToursBookingHistory.find();
    } catch (error) {
        return next(error);
    }

    if (!TourBookings) {
        success = false;
        return res.status(400).json({ success, message: "no TourBookings are here" })
    }

    success = true;
    return res.status(200).json({ message: "here are your all TourBookings", TourBookings: TourBookings })
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
        success = false;
        return res.status(400).json({ success, message: "no TransportBookings are here" })
    }

    success = true;
    return res.status(200).json({ message: "here are your all TransportBookings", TransportBookings: TransportBookings })
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
        success = false;
        return res.status(400).json({ success, message: "no HotelBookings are here" })
    }

    success = true;
    return res.status(200).json({ message: "here are your all HotelBookings", HotelBookings: HotelBookings })
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
        success = false;
        return res.status(400).json({ success, message: "no TourBookings are here" })
    }

    success = true;
    return res.status(200).json({ message: "here are your all TourBookings", TourBookings: TourBookings })
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
        success = false;
        return res.status(400).json({ success, message: "no TransportBookings are here" })
    }

    success = true;
    return res.status(200).json({ message: "here are your all TransportBookings", TransportBookings: TransportBookings })
}