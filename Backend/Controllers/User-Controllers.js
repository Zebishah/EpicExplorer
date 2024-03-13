import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import StellarSdk from 'stellar-sdk';
import * as crypto from 'crypto';
import bcrypt from 'bcrypt';
import fetch from 'node-fetch';
import { Server } from 'stellar-sdk/lib/horizon/server.js';
const server = new Server("https://horizon-testnet.stellar.org");
import User from '../Models/User.js';
import Admin from '../Models/Admin.js';
import Token from '../Models/Token.js';
import moment from 'moment';
import config from '../config.js';
import transporter from '../Mailer.js';
import stripePackage from 'stripe';
import dotenv from 'dotenv';
import express from 'express';
const app = express();
dotenv.config();
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = new stripePackage(stripeSecretKey);

let success = null;
export const createUser = async (req, res, next) => {
    let balance = "2";

    const { name, email, phone, password, confirmPassword, wishList, bookedTour, bookedHotels, bookedTransport } = req.body;
    if ((name.trim() === "" || email.trim() === "" || phone === "" || password.trim() === "")) {
        return res.status(400).json({ success: false, message: "enter ur credentials first" });
    }
    if (confirmPassword !== password) {
        return res.status(400).json({ success: false, message: "passwords are not matching with each other" });
    }
    try {
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        // const hashedConfirmedPassword = await bcrypt.hash(confirmPassword, 10);
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

        // Create the new user in your database
        const newUser = new User({
            name,
            email,
            phone,
            password: hashedPassword,
            wishList,
            AccountId: sourceAccountId,
            SecretSeed: sourceSecretSeed,
            Balance: "0",
            bookedTour, bookedTransport, bookedHotels // Set to 0 initially
        });
        await newUser.save();

        return res.status(200).json({ success: true, message: "User signed up successfully", user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ success: false, message: "Error creating user", error });
    }

}

export const userLogin = async (req, res, next) => {

    let { email, password } = req.body;
    if (email.trim() === "" || password.trim() === "") {
        return res.status(400).json({ success: false, message: "enter ur credentials first" });
    }
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
        return res.status(400).json({ success, message: "wrong password" })
    }
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
    success = true;
    return res.status(200).json({ message: "User signed in successfully", token: token, id: existingUser._id, user: existingUser })

}

//get all userss
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
export const deleteUser = async (req, res, next) => {
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

    let id = req.params.id;
    if (!id) {
        return res.status(400).json({ success, message: "no id detected" });
    }
    let deletedUser;
    try {
        deletedUser = await User.findByIdAndDelete(id);
    } catch (error) {
        return next(error);
    }

    if (!deletedUser) {
        success = false;
        return res.status(400).json({ success, message: "User not existed that u are trying to delete" });
    }
    success = true;
    return res.status(200).json({ success, message: "User deleted successfully", deletedUser: deletedUser, admin: adminId })
}

export const updatePassword = async (req, res, next) => {
    let { oldPassword, newPassword, confirmPassword } = req.body;

    if ((oldPassword.trim() === "" || newPassword.trim() === "" || confirmPassword.trim() === "")) {
        return res.status(400).json({ success: false, message: "enter ur credentials first" });
    }
    if (confirmPassword !== newPassword) {
        return res.status(400).json({ success: false, message: "passwords are not matching with each other" });
    }
    const extractedToken = req.header("auth-token");
    let userId;
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
            userId = decrypted.id;
        }
    })
    let user;
    try {
        user = await User.findById(userId)
    } catch (error) {
        return next(error)
    }

    if (!user) {
        return res.status(400).json({ success: false, message: "no user detected" });
    }
    const isCorrectPassword = bcrypt.compareSync(oldPassword, user.password);
    if (!(isCorrectPassword)) {
        return res.status(400).json({ success: false, message: "wrong old password" });

    }
    const hashedNewPassword = bcrypt.hashSync(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();
    let updatedUser;
    try {
        updatedUser = await User.findById(userId);
    } catch (error) {
        return next(error);
    }

    if (!updatedUser) {
        success = false;
        return res.status(400).json({ success, message: "User not existed that u are trying to delete" });
    }
    success = true;
    return res.status(200).json({ success, message: "password updated successfully", updatedUser: updatedUser, user: userId })
}
export const forgetPassword = async (req, res, next) => {

    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ success: false, message: "No user with this email found..." });
        }

        const token = crypto.randomBytes(32).toString("hex");
        const hash = bcrypt.hashSync(token, 10);

        const expiry = moment.utc().add(config.tokenExpiry, "seconds");

        const newToken = new Token({
            userId: user._id,
            token: hash,
            createdAt: Date.now(),
        });

        await newToken.save();

        const resetUrl = `${process.env.BASE_URL}/User/resetPassword/${hash}`;

        // send email with reset link
        const message = `<p>Please click the following link to reset your password:</p>
              <p><a href="${resetUrl}">${resetUrl}</a></p>`;

        const mailOptions = {
            from: process.env.USER,
            to: user.email,
            subject: "Password Reset Request",
            html: message,
        };
        await transporter.sendMail(mailOptions);


        return res.status(200).json({
            success: true,
            message: "Password reset link has been sent to your email.",
            hash,
            message,
        });
    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(400).json({
            success: false,
            message: "Password reset link not sent to you.",
        });
    }

}
export const resetPassword = async (req, res, next) => {
    try {
        const extractedToken = req.header("auth-token");
        if (!extractedToken || extractedToken.trim() === "") {
            return res.status(400).json({ success: false, message: "No token found..." });
        }

        const { id: userId } = jwt.verify(extractedToken, process.env.JWT_SECRET);

        const token = await Token.findOne({
            userId: userId,
            token: req.params.hash,
        });

        if (!token) {
            return res.status(400).json({ success: false, message: "Invalid token found..." });
        }

        const user = await User.findById(userId);

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
        await user.save();

        await token.deleteOne();

        res.status(200).json({
            success: true, message: "Password changed successfully.",
        });
    } catch (error) {
        res.status(400).json({
            success: false, error: error.message,
        });
    }
}





export const confirmOrder = async (req, res, next) => {

    const extractedToken = req.header('auth_token');

    let userId;
    if (!extractedToken && extractedToken.trim() == "") {
        success = false;
        return res.status(400).json({ success, message: "No token found..." })
    }

    jwt.verify(extractedToken, process.env.JWT_SECRET, async (err, decrypted) => {
        if (err) {
            success = false;
            return res.status(400).json({ success, message: "wrong one token is not authenticated...", error: err })
        } else {
            userId = decrypted.id;
            let user;
            try {
                user = await User.findById(userId)
            } catch (error) {
                return next(error)
            }

            if (!user) {
                return res.status(400).json({ success: false, message: "no user detected" });
            }
            try {
                console.log("a gye")
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: 105000, // Amount in cents
                    currency: 'pkr',
                    // Verify your integration in this guide by including this parameter
                    metadata: { integration_check: 'accept_a_payment' },
                });
                return res.status(200).json({ clientSecret: paymentIntent.client_secret, id: paymentIntent.id, name: user.name, email: user.email });
            } catch (err) {
                console.error(err);
                return res.status(500).json({ error: 'An error occurred while creating PaymentIntent' });
            }
        }
    });
};

export const confirmOrders = async (req, res, next) => {

    const extractedToken = req.header('auth_token');

    let userId;
    if (!extractedToken && extractedToken.trim() == "") {
        success = false;
        return res.status(400).json({ success, message: "No token found..." })
    }

    jwt.verify(extractedToken, process.env.JWT_SECRET, async (err, decrypted) => {
        if (err) {
            success = false;
            return res.status(400).json({ success, message: "wrong one token is not authenticated...", error: err })
        } else {
            userId = decrypted.id;
            let user;
            try {
                user = await User.findById(userId)
            } catch (error) {
                return next(error)
            }

            if (!user) {
                return res.status(400).json({ success: false, message: "no user detected" });
            }
            try {
                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    line_items: [
                        {
                            price_data: {
                                currency: 'usd',
                                product_data: {
                                    name: 'T-shirt',
                                },
                                unit_amount: 2000, // Amount in cents
                            },
                            quantity: 1,
                        },
                    ],
                    mode: 'payment',
                    success_url: 'http://localhost:3000/Success',
                    cancel_url: 'http://localhost:3000/Cancel',
                    customer_email: user.email
                    // clientReferenceId:
                });

                res.json({ sessionId: session });
            } catch (error) {
                return next(error);
            }
        }
    });
};


export const requestBalance = async (req, res, next) => {

    const extractedToken = req.header('auth_token');

    let userId;
    if (!extractedToken && extractedToken.trim() == "") {
        success = false;
        return res.status(400).json({ success, message: "No token found..." })
    }

    jwt.verify(extractedToken, process.env.JWT_SECRET, async (err, decrypted) => {
        if (err) {
            success = false;
            return res.status(400).json({ success, message: "wrong one token is not authenticated...", error: err })
        } else {
            userId = decrypted.id;
            let user;
            try {
                user = await User.findById(userId)
            } catch (error) {
                return next(error)
            }

            if (!user) {
                return res.status(400).json({ success: false, message: "no user detected" });
            }

        }
    });
};
