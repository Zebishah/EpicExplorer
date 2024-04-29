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
import UserStellarTransaction from '../Utils/UserTransaction.js';
import NotificationsAdmin from '../Models/NotificationsAdmin.js';
import NotificationsUser from '../Models/NotificationsUser.js';


const app = express();
dotenv.config();
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = new stripePackage(stripeSecretKey);

let success = null;
export const createUser = async (req, res, next) => {


    let user = await req.user;

    const { name, email, phone, password, confirmPassword, wishList, bookedTour, bookedHotels, bookedTransport } = req.body;

    if (name.trim() === "" || email.trim() === "" || phone === "" || password.trim() === "") {
        return res.status(400).json({ success: false, message: "Enter your credentials first" });
    }

    if (confirmPassword !== password) {
        return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    try {
        if (user) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userKeypair = StellarSdk.Keypair.random();
        let userPublicKey = userKeypair.publicKey();
        let userPrivateKey = userKeypair.secret();
        let account;
        try {
            account = await server.loadAccount(userPublicKey);
        } catch (error) {
            if (error instanceof StellarSdk.NotFoundError) {
                // Account not found, create it using Friendbot
                try {
                    await fetch(`https://friendbot.stellar.org/?addr=${userPublicKey}`);
                    // Retry loading the account
                    account = await server.loadAccount(userPublicKey);
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
        const newUser = new User({
            name,
            email,
            phone,
            password: hashedPassword,
            wishList,
            AccountId: userPublicKey,
            SecretSeed: userPrivateKey,
            Balance: Balance,
            bookedTour,
            bookedTransport,
            bookedHotels
        });
        await newUser.save();


        let date = new Date();
        let notificationAdmin = new NotificationsAdmin({ accommodationName: name, Category: "user", message: `One user ${name} is added to our site`, date: date });
        await notificationAdmin.save();

        return res.status(200).json({ success: true, message: "User signed up successfully", newUser: newUser });
    } catch (error) {

        return res.status(500).json({ success: false, message: "Error occurred while making account", error: error.message });
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
        return res.status(400).json({ success: false, message: "wrong password" })
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { //signing a JWT token 
        expiresIn: "7d"
    });

    return res.status(200).json({ success: true, message: "User signed in successfully", token: token, id: user._id, user: user })

}

//get all userss
export const getUsers = async (req, res, next) => {

    let user = await req.user;//getting User from middleware
    success = true;
    return res.status(200).json({ success, message: "here are your all Users", user: user })
}
export const checkUserBalance = async (req, res, next) => { //for checking admin stellar account balance
    // extracting token and validating admin
    let user = req.user;
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
        deletedUser = await User.findByIdAndDelete(id); //deleting user after fetching given Id Tour
    } catch (error) {
        return next(error);
    }

    if (!deletedUser) {

        return res.status(400).json({ success: false, message: "User not existed that u are trying to delete" });
    }
    let date = new Date();
    let notificationAdmin = new NotificationsAdmin({ accommodationName: deleteUser.name, Category: "userDeleted", message: `one user ${deleteUser.name} is deleted from our site `, date: date })
    await notificationAdmin.save();
    return res.status(200).json({ success: true, message: "User deleted successfully", deletedUser: deletedUser })
}

export const updatePassword = async (req, res, next) => {
    let { oldPassword, newPassword, confirmPassword } = req.body;

    if ((oldPassword.trim() === "" || newPassword.trim() === "" || confirmPassword.trim() === "")) {
        return res.status(400).json({ success: false, message: "enter ur credentials first" });
    }

    let user = req.user; //getting User from middleware

    if (confirmPassword !== newPassword) {
        return res.status(400).json({ success: false, message: "passwords are not matching with each other" });
    }
    const isCorrectPassword = bcrypt.compareSync(oldPassword, user.password); //comparing Passwords 
    if (!(isCorrectPassword)) {
        return res.status(400).json({ success: false, message: "wrong old password" });

    }
    const hashedNewPassword = bcrypt.hashSync(newPassword, 10); //hashing new Password
    user.password = hashedNewPassword;
    await user.save();


    return res.status(200).json({ success: true, message: "password updated successfully", updatedUser: user, })
}
export const forgetPassword = async (req, res, next) => {
    let options = [{}];
    let user = await req.user;
    // token creation
    let hash = await tokenCreation(user);

    try {
        //making reset URL
        const resetUrl = `${process.env.BASE_URL}/User/resetPassword`;

        const message = `<p>Please click the following link to reset your password:</p>
              <p><a href="${resetUrl}">${resetUrl}</a></p>`;

        const options = { email: user.email, message: message };
        await sendEmail(options);

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

    let user = await req.user; //getting User from middleware
    const hash = req.header('hash');
    try {
        const token = await Token.findOne({   //Finding reset Token
            userId: user.id,
            token: hash,
        });

        if (!token) {
            return res.status(400).json({ success: false, message: "Invalid token found..." });
        }
        const salt = await bcrypt.genSalt(10); //hashing password by adding some salt(some extra hashing) 
        user.password = await bcrypt.hash(req.body.password, salt);
        console.log(user.password)
        await user.save();
        await token.deleteOne(); //deleting token that we made for reset 
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
        // stripe payment session
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
            success_url: `http://localhost:3000/Success/${amount}`,  //url where wo go if our task will be successful
            cancel_url: 'http://localhost:3000/Cancel', //url where wo go if our task will be unsuccessful
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
        const adminKeyPair = StellarSdk.Keypair.fromSecret(adminSecretKey);
        const adminPublicKey = adminKeyPair.publicKey();

        try {
            const account = await server.loadAccount(adminPublicKey);
            let xlm = (Number.parseFloat(amount) / 32.15).toFixed(7);
            let destinationAcc = user.AccountId;
            let response = await UserStellarTransaction(account, xlm, adminKeyPair, destinationAcc)
            let xlmAmount = Number(xlm);//here will use bill amount'
            // Update admin balance
            let admin = await Admin.findOne({ AccountId: process.env.ADMIN_ACCOUNT_ID });
            admin.Balance = Number(admin.Balance) - xlmAmount;
            await admin.save();
            // Update user balance
            user.Balance = Number(user.Balance) + xlmAmount;
            await user.save();
            let date = new Date();
            let notificationAdmin = new NotificationsAdmin({ accommodationName: user.name, Category: "requested Balance", message: `one user ${user.name} is requested ${amount} balance from our site `, date: date })
            await notificationAdmin.save();
            let notificationUser = new NotificationsUser({ accommodationName: user.name, Category: "requested Balance", message: `${user.name} You requested ${amount} balance from our site `, date: date })
            await notificationUser.save();
            return res.status(200).json({ success: true, message: "Payment Successful", response });

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
    const userKeyPair = StellarSdk.Keypair.fromSecret(userSecretKey);
    const userPublicKey = userKeyPair.publicKey();


    try {
        const account = await server.loadAccount(userPublicKey);

        if (parseFloat(account.balances[0].balance) < xlm) {
            return res.status(400).json({ success: false, message: 'Insufficient balance go and add balance in ur stellar account by paying ', balance: account.balances[0].balance });
        }
        let destinationAcc = process.env.ADMIN_ACCOUNT_ID;
        const response = await StellarTransaction(account, xlm, userKeyPair, destinationAcc);


        try {

            const xlm = (Number.parseFloat(amount).toFixed(7));
            const xlmAmount = Number(xlm);
            let admin = await Admin.findOne({ AccountId: process.env.ADMIN_ACCOUNT_ID })//finding admin
            // updating admin balance
            admin.Balance = Number(admin.Balance) + xlmAmount;;
            await admin.save();
            // updating User balance
            user.Balance = Number(user.Balance) - xlmAmount;
            await user.save();

            let tourBooking; //fetching the tour which is being in process for booking by user 
            try {

                tourBooking = await BookingTour.findOne({ tourId: tourId });
            } catch (error) {
                return next(error);
            }

            let tourBooked; //checking that this tour booked information by that user is already in database or not 
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

            let maxBookedTourNo; //incrementing the booked tour value if its already booked by user some other time 
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
            try { //adding booked tour information in database

                const newBookedTourNo = maxBookedTourNo + 1;

                tourBooked = new BookTour({ BooksCount: booksCount, bookedTourNo: newBookedTourNo, tourId: tourBooking.tourId, name: tourBooking.name, image: tourBooking.image, price: tourBooking.price, startDate: tourBooking.startDate, endDate: tourBooking.endDate, checkInDate: tourBooking.checkInDate, travelers: tourBooking.travelers, bookerName: tourBooking.bookerName, bookerEmail: tourBooking.bookerEmail, bookerPhone: tourBooking.bookerPhone, bookerAddress: tourBooking.bookerAddress, suggestion: tourBooking.suggestion, bookerId: user.id, members: tourBooking.suggestion, pickupLocation: tourBooking.pickupLocation });

                tourBooked = await tourBooked.save();


            } catch (error) {
                return next(error);
            }
            let tourHistory; //checking booked tour information in booked tour history that its already present or not
            try {

                tourHistory = await ToursBookingHistory.findOne({ tourId: tourId });
            } catch (error) {
                return next(error);
            }
            if (tourHistory) {

                return res.status(400).json({ success: false, message: "Tour already existed " });
            }
            let date = new Date(); //getting date
            let tour;

            try {
                tour = await Tour.findById(tourBooking.tourId); //adding booked tour information in database
                tourHistory = new ToursBookingHistory({ tourId: tourBooking.tourId, name: tourBooking.name, image: tourBooking.image, bookingDate: tourBooking.checkInDate, bookerName: tourBooking.bookerName, bookerId: tourBooking.bookerId, checkOutDate: tour.endDate })
                await tourHistory.save();
                tour.bookers.push(user.id);
                tour.bookings.push(tourBooking.checkInDate);  //updating attributes information of collections in database
                user.bookedTour.push(tourBooking.tourId)
                await tour.save(); //saving data after updating 
                await user.save();
                let date = new Date();
                let notificationAdmin = new NotificationsAdmin({ accommodationName: user.name, Category: "payment of tour", message: `one user ${user.name} is did ${amount} xlm payment from our site `, date: date })
                await notificationAdmin.save();
                let notificationUser = new NotificationsUser({ accommodationName: user.name, Category: "payment of tour", message: `${user.name} You did ${amount} xlm payment to our site `, date: date })
                await notificationUser.save();
            } catch (error) {
                return next(error);
            }

            if (!tour) {
                success = false;
                return res.status(400).json({ success, message: "Tour not existed " });
            }
            let bill, deliveryCharges = "free", bookingTimes = 0;

            try {

                //saving bill information and updating database data 
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
    try { // searching specific user tour bookings
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
    try { // searching specific user Hotel bookings
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
    try {  // searching specific user Transport bookings
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
    let user = req.user;
    let id = req.params.id;//getting User from middleware
    let userInfo;
    try {  // fetching specific user info
        userInfo = await User.findById(id);
    } catch (error) {
        return next(error);
    }

    if (!userInfo) {

        return res.status(400).json({ success: false, message: "no userInfo are here" })
    }


    return res.status(200).json({ success: true, message: "here is your userInfo", userInfo: userInfo })
}

export const stellarLedger = async (req, res, next) => {
    server
        .ledgers()
        .order('desc')
        .limit(10)
        .call()
        .then((response) => {
            const ledger = response.records[0];
            return res.status(200).json({ success: true, message: "here is your ledger", ledger: ledger })
        })
        .catch((error) => {
            return res.status(400).json({ success: false, message: "no ledger are here", error })
        });

}

export const searchUserStellarAcc = async (req, res, next) => {
    let { accountId } = req.body;
    const account = await server.loadAccount(accountId);
    if (!account) {
        return res.status(200).json({ success: true, message: "here is your ledger", ledger: ledger })
    }
    else {
        return res.status(400).json({ success: false, message: "no ledger are here", error })
    }
}