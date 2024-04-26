import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import bcrypt from 'bcrypt';
import fetch from 'node-fetch';
import StellarSdk from 'stellar-sdk';
import { Server } from 'stellar-sdk/lib/horizon/server.js';
const server = new Server("https://horizon-testnet.stellar.org/");
import User from '../Models/User.js';
import Admin from '../Models/Admin.js';
import Token from '../Models/Token.js';
import stripePackage from 'stripe';
import dotenv from 'dotenv';
import express, { response } from 'express';
import sendEmail from '../Utils/NodeMailer.js';
import tokenCreation from '../Utils/TokenCreator.js';
import BookTour from '../Models/BookTour.js';
import Tour from '../Models/Tour.js';
import BookingTour from '../Models/BookingTour.js';
import ToursBookingHistory from '../Models/ToursBookingHistory.js';
import Bill from '../Models/Bill.js';
import makingTourBill from '../Models/makingTourBill.js';
import TransportBookingHistory from '../Models/TransportBookingHistory.js';
import HotelBookingHistory from '../Models/HotelBookingHistory.js';
import StellarTransaction from '../Utils/Transaction.js';
import KeysCreations from '../Utils/AdminStellarKeysGenerator.js';


const app = express();
dotenv.config();
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = new stripePackage(stripeSecretKey);

let success = null;
export const createUser = async (req, res, next) => {
    let balance = "2";
    //getting user input from request Body  
    const { name, email, phone, password, confirmPassword, wishList, bookedTour, bookedHotels, bookedTransport } = req.body;

    if ((name.trim() === "" || email.trim() === "" || phone === "" || password.trim() === "")) {
        return res.status(400).json({ success: false, message: "enter ur credentials first" });
    }

    if (confirmPassword !== password) {
        return res.status(400).json({ success: false, message: "passwords are not matching with each other" });
    }

    try {
        let user = req.user;//getting user from middleware

        if (user) {
            return res.status(400).json({ success: false, message: "user already existed" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const { sourceAccountId, sourceSecretSeed } = await KeysCreations();

        const adminAccount = await server.loadAccount(process.env.ADMIN_ACCOUNT_ID);
        const adminKeyPair = StellarSdk.Keypair.fromSecret(process.env.ADMIN_SECRET_SEED);
        const response = await StellarTransaction(adminAccount, balance, adminKeyPair);
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
        console.log(user)
        return res.status(200).json({ success: true, message: "User signed up successfully", user: newUser, response: response });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ success: false, message: "error Occurs while making account ", error });
    }

}

export const userLogin = async (req, res, next) => {
    //getting user input from request Body  
    let { email, password } = req.body;

    if (email.trim() === "" || password.trim() === "") {
        return res.status(400).json({ success: false, message: "enter ur credentials first" });
    }
    let user = req.user;//getting User from middleware
    const isCorrectPassword = bcrypt.compareSync(password, user.password)

    if (!isCorrectPassword) {
        success = false;
        return res.status(400).json({ success, message: "wrong password" })
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
    success = true;
    return res.status(200).json({ message: "User signed in successfully", token: token, id: user._id, user: user })

}

//get all userss
export const getUsers = async (req, res, next) => {


    let user = req.user;//getting User from middleware
    success = true;
    return res.status(200).json({ success, message: "here are your all Users", user: user })
}
export const checkUserBalance = async (req, res, next) => {

    let user = req.user;//getting User from middleware
    server.loadAccount(user.AccountId)
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
    return res.status(200).json({ success, message: "User deleted successfully", deletedUser: deletedUser })
}

export const updatePassword = async (req, res, next) => {
    let { oldPassword, newPassword, confirmPassword } = req.body;

    if ((oldPassword.trim() === "" || newPassword.trim() === "" || confirmPassword.trim() === "")) {
        return res.status(400).json({ success: false, message: "enter ur credentials first" });
    }

    let user = req.user;//getting User from middleware

    if (confirmPassword !== newPassword) {
        return res.status(400).json({ success: false, message: "passwords are not matching with each other" });
    }
    const isCorrectPassword = bcrypt.compareSync(oldPassword, user.password);
    if (!(isCorrectPassword)) {
        return res.status(400).json({ success: false, message: "wrong old password" });

    }
    const hashedNewPassword = bcrypt.hashSync(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    success = true;
    return res.status(200).json({ success, message: "password updated successfully", updatedUser: user, user: userId })
}
export const forgetPassword = async (req, res, next) => {
    let options = [{}];
    let user = await req.user;
    // token creation

    let hash = await tokenCreation(user);

    try {

        const resetUrl = `${process.env.BASE_URL}/User/resetPassword/${hash}`;

        const message = `<p>Please click the following link to reset your password:</p>
              <p><a href="${resetUrl}">${resetUrl}</a></p>`;
        options.push({ email: user.email, message: message })
        sendEmail(options);

        return res.status(200).json({
            success: true,
            message: "Password reset link has been sent to your email.",
            hash,
            message,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Password reset link not sent to you.",
        });
    }

}
export const resetPassword = async (req, res, next) => {

    let user = req.user;//getting User from middleware
    try {
        const token = await Token.findOne({
            userId: user.id,
            token: req.params.hash,
        });

        if (!token) {
            return res.status(400).json({ success: false, message: "Invalid token found..." });
        }


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


    let user = req.user;//getting User from middleware
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


};

export const confirmOrders = async (req, res, next) => {

    let user = req.user;//getting User from middleware
    let amount = 2000;

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
                        unit_amount: amount, // Amount in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `http://localhost:3000/Success/${amount}`,
            cancel_url: 'http://localhost:3000/Cancel',
            customer_email: user.email
            // clientReferenceId:
        });

        res.json({ sessionId: session, clientSecret: session.client_secret, amount: amount });
    } catch (error) {
        return next(error);
    }


};
export const requestBalance = async (req, res, next) => {
    const { amount } = req.body;
    let user = await req.user;


    try {

        const adminSecretKey = process.env.ADMIN_SECRET_SEED;
        const adminKeypair = StellarSdk.Keypair.fromSecret(adminSecretKey);
        const adminPublicKey = adminKeypair.publicKey();

        try {
            const account = await server.loadAccount(adminPublicKey);
            let xlm = (Number.parseFloat(amount) / 6.75).toFixed(7);
            const transaction = new StellarSdk.TransactionBuilder(account, {
                fee: StellarSdk.BASE_FEE,
                networkPassphrase: StellarSdk.Networks.TESTNET
            })
                .addOperation(StellarSdk.Operation.payment({
                    destination: user.AccountId, // Admin account's public key
                    asset: StellarSdk.Asset.native(),
                    amount: xlm.toString() // Amount of XLM to add to the admin account
                }))
                .setTimeout(180)
                .build();

            transaction.sign(adminKeypair);

            const response = await server.submitTransaction(transaction);
            let xlmAmount = Number(xlm);//here will use bill amoun'
            // Update admin balance
            let admin = await Admin.findOne({ AccountId: process.env.ADMIN_ACCOUNT_ID });
            admin.Balance = Number(admin.Balance) - xlmAmount;
            await admin.save();

            // Update user balance
            user.Balance = Number(user.Balance) + xlmAmount;
            await user.save();
            console.log("payment 1 finished ")


            return res.status(200).json({ success: true, message: "Payment Successful", response: response });

        } catch (error) {
            console.error(error);
            return res.status(400).json({ success: false, message: "Payment error", error: error });
        }
    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: "Token is not authenticated...", error: error });
    }
};


export const stellarPayment = async (req, res, next) => {

    const { amount } = req.body;
    let user = await req.user;
    let booksCount = 0;
    let tourId = req.params.id;
    const xlm = Number.parseFloat(amount).toFixed(7);
    const userSecretKey = user.SecretSeed;
    const userKeypair = StellarSdk.Keypair.fromSecret(userSecretKey);
    const userPublicKey = userKeypair.publicKey();


    try {
        const account = await server.loadAccount(userPublicKey);

        if (parseFloat(account.balances[0].balance) < xlm) {
            return res.status(400).json({ success: false, message: 'Insufficient balance go and add balance in ur stellar account by paying ', balance: account.balances[0].balance });
        }

        const response = await StellarTransaction(account, xlm, userKeypair);


        try {

            const xlm = (Number.parseFloat(amount).toFixed(7));
            const xlmAmount = Number(xlm);
            let admin = await Admin.findOne({ AccountId: process.env.ADMIN_ACCOUNT_ID })
            admin.Balance = Number(admin.Balance) + xlmAmount;;
            await admin.save();
            user.Balance = Number(user.Balance) - xlmAmount;
            await user.save();

            let tourBooking;
            try {

                tourBooking = await BookingTour.findOne({ tourId: tourId });
            } catch (error) {
                return next(error);
            }

            let tourBooked;
            try {
                tourBooked = await BookTour.findOne({ tourId: tourBooking.tourId, bookerEmail: tourBooking.bookerEmail })
            } catch (error) {
                return next(error);
            }

            if (tourBooked) {
                tourBooked.BooksCount = tourBooked.BooksCount + 1;
                booksCount = tourBooked.BooksCount
                return res.status(400).json({ success, message: "Tour already booked and existed " });
            }

            let maxBookedTourNo;
            try {
                const maxTourBooking = await BookTour.findOne({}, { bookedTourNo: 1 }, { sort: { bookedTourNo: -1 } });
                if (maxTourBooking) {
                    maxBookedTourNo = maxTourBooking.bookedTourNo;
                } else {
                    maxBookedTourNo = 0; // If no bookings exist yet, set the initial value
                }
            } catch (error) {
                return next(error);
            }
            try {
                // tourNo = tourNo + 1;
                const newBookedTourNo = maxBookedTourNo + 1;

                tourBooked = new BookTour({ BooksCount: booksCount, bookedTourNo: newBookedTourNo, tourId: tourBooking.tourId, name: tourBooking.name, image: tourBooking.image, price: tourBooking.price, startDate: tourBooking.startDate, endDate: tourBooking.endDate, checkInDate: tourBooking.checkInDate, travelers: tourBooking.travelers, bookerName: tourBooking.bookerName, bookerEmail: tourBooking.bookerEmail, bookerPhone: tourBooking.bookerPhone, bookerAddress: tourBooking.bookerAddress, suggestion: tourBooking.suggestion, bookerId: user.id, members: tourBooking.suggestion, pickupLocation: tourBooking.pickupLocation });

                tourBooked = await tourBooked.save();


            } catch (error) {
                return next(error);
            }
            let tourHistory;
            try {
                // tourNo = tourNo + 1;
                tourHistory = await ToursBookingHistory.findOne({ tourId: tourId });
            } catch (error) {
                return next(error);
            }
            if (tourHistory) {

                return res.status(400).json({ success, message: "Tour already existed " });
            }
            let date = new Date();
            let tour;

            try {
                tour = await Tour.findById(tourBooking.tourId);
                tourHistory = new ToursBookingHistory({ tourId: tourBooking.tourId, name: tourBooking.name, image: tourBooking.image, bookingDate: tourBooking.checkInDate, bookerName: tourBooking.bookerName, bookerId: tourBooking.bookerId, checkOutDate: tour.endDate })
                await tourHistory.save();
                tour.bookers.push(user.id);
                tour.bookings.push(tourBooking.checkInDate);
                user.bookedTour.push(tourBooking.tourId)
                await tour.save();
                await user.save();
            } catch (error) {
                return next(error);
            }

            if (!tour) {
                success = false;
                return res.status(400).json({ success, message: "Tour not existed " });
            }
            let bill, deliveryCharges = "free", bookingTimes = 0;

            try {


                bill = new Bill({ booking: tourBooked.id, bookerId: user.id, senderAccountId: user.AccountId, ReceiverAccountId: process.env.ADMIN_ACCOUNT_ID, booker: user.name, deliveryCharges: deliveryCharges, totalPrice: tour.price, tourName: tour.name, date });
                bill = await bill.save();
                await BookingTour.findOneAndDelete({ tourId: tourBooking.tourId, bookerId: user.id });
                await makingTourBill.findOneAndDelete({ bookerId: user.id, booking: tourBooking.id })
            } catch (error) {
                return next(error);
            }

            return res.status(200).json({ success: true, message: "Payment Successful", response: response });
        } catch (error) {

            return res.status(400).json({ success: false, message: "Payment error", error: error });
        }

    } catch (error) {
        console.log(error)
    }

};
export const userTourBookings = async (req, res, next) => {
    let user = req.user;//getting User from middleware
    let tourId = req.params.id;
    let TourBookings;
    try {
        TourBookings = await ToursBookingHistory.find({ bookerId: user.id, tourId: tourId });
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
export const userHotelBookings = async (req, res, next) => {
    let user = req.user;//getting User from middleware
    let hotelId = req.params.id;
    let HotelBookings;
    try {
        HotelBookings = await HotelBookingHistory.find({ bookerId: user.id, hotelId: hotelId });
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
export const userTransportBookings = async (req, res, next) => {
    let user = req.user;//getting User from middleware
    let transportId = req.params.id;
    let TransportBookings;
    try {
        TransportBookings = await TransportBookingHistory.find({ bookerId: user.id, transportId: transportId });
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

export const getUserInfo = async (req, res, next) => {
    let user = req.user;//getting User from middleware
    let userInfo;
    try {
        userInfo = await User.findById(user.id);
    } catch (error) {
        return next(error);
    }

    if (!userInfo) {
        success = false;
        return res.status(400).json({ success, message: "no userInfo are here" })
    }

    success = true;
    return res.status(200).json({ message: "here is your userInfo", userInfo: userInfo })
}