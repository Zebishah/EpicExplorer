import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import express, { response } from 'express';
import Admin from '../Models/Admin.js';
import Transport from '../Models/Transport.js';
import BookTransport from '../Models/BookTransport.js';
import TransportBookingHistory from '../Models/TransportBookingHistory.js';
import Bill from '../Models/Bill.js';
import ItrenaryServicesTransport from '../Models/ItrenaryServicesTransport.js';
import BookingTransport from '../Models/BookingTransport.js';
import makingTransportBill from '../Models/makingTransportBill.js';
import TransportBill from '../Models/TransportBill.js';
import StellarSdk from 'stellar-sdk';
import { Server } from 'stellar-sdk/lib/horizon/server.js';
import StellarTransaction from '../Utils/Transaction.js';
import NotificationsAdmin from '../Models/NotificationsAdmin.js';
import NotificationsUser from '../Models/NotificationsUser.js';
const server = new Server("https://horizon-testnet.stellar.org/");
const app = express();
dotenv.config();
let success = null;
export const addTransport = async (req, res, next) => {
    let transportNo = 0;

    let { carName, prices, seats, type, description, image, gallery, features, allowedGuests, reviews, available, bookers, bookings, bookedCount } = req.body;

    let admin = req.admin;

    let existingTransport;
    try {
        existingTransport = await Transport.findOne({ carName: carName });

    } catch (error) {
        return next(error);
    }
    if (existingTransport) {
        success = false;
        return res.status(400).json({ success, message: "Transport already existed " });
    }
    let transport;
    try {
        transportNo = transportNo + 1;
        transport = new Transport({ transportNo, carName, prices, seats, type, description, image, gallery, features, allowedGuests, reviews, available, bookers, bookings, bookedCount });
        transport = await transport.save();
        let date = new Date();
        let notificationAdmin = new NotificationsAdmin({ accommodationName: carName, Category: "new transport added", message: `one transport ${carName} is added in our site `, date: date })
        await notificationAdmin.save();
        let notificationUser = new NotificationsUser({ accommodationName: carName, Category: "new transport added", message: `new transport ${carName} is added....`, date: date })
        await notificationUser.save();
    } catch (error) {
        return next(error);
    }
    return res.status(200).json({ success: true, message: "New Transport is created", transport: transport });
};
export const getTransport = async (req, res, next) => {

    let transport;
    try {
        transport = await Transport.find();
    } catch (error) {
        return next(error);
    }

    if (!transport) {
        success = false;
        return res.status(400).json({ success, message: "no transport vehicles found in database" })
    }

    return res.status(200).json({ success: true, message: "here are your all transport", transport: transport })
}

export const deleteTransport = async (req, res, next) => {
    let id = req.params.id;

    let adminId = req.userId;

    let deleteTransport;
    try {
        deleteTransport = await Transport.findByIdAndDelete(id);
    } catch (error) {
        return next(error);
    }

    if (!deleteTransport) {

        return res.status(400).json({ success: true, message: "Transport not existed that u are trying to delete" });
    }
    let date = new Date();
    let notificationAdmin = new NotificationsAdmin({ accommodationName: user.name, Category: "new transport deleted", message: `one transport ${carName} is deleted from our site `, date: date })
    await notificationAdmin.save();
    let notificationUser = new NotificationsUser({ accommodationName: user.name, Category: "new transport deleted", message: `new transport ${carName} is deleted....`, date: date })
    await notificationUser.save();
    return res.status(200).json({ success: false, message: "Transport deleted successfully", deleteTransport: deleteTransport, admin: adminId })
}

export const updateTransport = async (req, res, next) => {
    let id = req.params.id;
    const { carName, prices, description, newImage, image, newFeature, available } = req.body;

    let transport;
    try {
        transport = await Transport.findById(id);
    } catch (error) {
        return next(error);
    }

    if (!transport) {
        return res.status(400).json({ success: false, message: "transport not existed" });
    }

    // Update tour information
    transport.carName = carName || transport.carName;
    transport.prices = prices || transport.prices;
    transport.description = description || transport.description;
    transport.available = available || transport.available;
    transport.image = image || transport.image;

    if (newImage) {
        transport.gallery.push(newImage);
    }

    if (newFeature) {
        transport.features.push(newFeature);
    }

    await transport.save();
    let date = new Date();
    let notificationAdmin = new NotificationsAdmin({ accommodationName: user.name, Category: "new transport information updated", message: `one transport ${carName} is information updated from our site `, date: date })
    await notificationAdmin.save();
    let notificationUser = new NotificationsUser({ accommodationName: user.name, Category: "new transport information updated", message: `transport ${carName} information updated....`, date: date })
    await notificationUser.save();
    return res.status(200).json({ success: true, message: 'transport updated successfully', transport: transport });


}

export const openTransport = async (req, res, next) => {
    let id = req.params.id;

    let transport;
    try {
        transport = await Transport.findById(id);
    } catch (error) {
        return next(error);
    }

    if (!transport) {
        return res.status(400).json({ success: false, message: "transport not existed that u are trying to open" });
    }

    let transportServiceIt;
    try {
        transportServiceIt = await ItrenaryServicesTransport.findOne({ transportId: id });
    } catch (error) {
        return next(error);
    }

    if (!transportServiceIt) {

        return res.status(400).json({ success: false, message: "Transport not existed that u are trying to open" });
    }

    return res.status(200).json({ success: true, transport: transport, transportServiceIt: transportServiceIt });

}

export const getFormData = async (req, res, next) => {
    //fetching Id from url parameters I
    let id = req.params.id;
    let { travelers, bookerName, bookerEmail, bookerPhone, bookerAddress, suggestion, members, days, seats } = req.body;
    let user = await req.user;
    console.log(user)
    let transport;
    try {
        transport = await Transport.findById(id);
    } catch (error) {
        return next(error);
    }

    if (!transport) {
        success = false;
        return res.status(400).json({ success, message: "Transport not existed that u are trying to open" });
    }
    let date = new Date();
    let transportBookingCheck;
    try {
        transportBookingCheck = await BookingTransport.findOne({ transportId: transport.id, bookerEmail: user.email })
    } catch (error) {
        return next(error);
    }

    if (transportBookingCheck) {

        return res.status(400).json({ success, message: "Transport already existed in booking database" });
    }
    let transportBooking;
    transport.prices = transport.prices * days;  //calculating price according to days
    try {
        // tourNo = tourNo + 1;
        transportBooking = new BookingTransport({ transportId: transport.id, carName: transport.carName, prices: transport.prices, checkInDate: date, travelers, bookerName, bookerEmail, bookerPhone, bookerAddress, suggestion, bookerId: user.id, members, days, seats, image: transport.image });
        transportBooking = await transportBooking.save();

    } catch (error) {
        return next(error);
    }
    let bill, deliveryCharges = "free";

    try {

        bill = new makingTransportBill({ booking: transportBooking.id, bookerId: user.id, booker: user.name, deliveryCharges: deliveryCharges, totalPrice: transport.prices, transportName: transport.carName, date });
        bill = await bill.save();

    } catch (error) {
        return next(error);
    }

    return res.status(200).json({ success: true, message: "New Tour booking start do payment", bill: bill, transportBooking: transportBooking });


};

export const transportPayment = async (req, res, next) => {

    const { amount } = req.body;
    let user = await req.user;
    let booksCount = 0;
    let transportId = req.params.id;
    const xlm = Number.parseFloat(amount).toFixed(7);
    const userSecretKey = user.SecretSeed;
    const userKeyPair = StellarSdk.Keypair.fromSecret(userSecretKey);

    // Admin account's public key
    const userPublicKey = userKeyPair.publicKey();


    try {
        const account = await server.loadAccount(userPublicKey);
        //checking that balance in user account is enough or not
        if (parseFloat(account.balances[0].balance) < xlm) {
            return res.status(400).json({ success: false, message: 'Insufficient balance go and add balance in ur stellar account by paying ', balance: account.balances[0].balance });
        }
        let destinationAcc = process.env.ADMIN_ACCOUNT_ID;
        const response = await StellarTransaction(account, xlm, userKeyPair, destinationAcc);
        try {
            const xlm = (Number.parseFloat(amount).toFixed(7));
            const xlmAmount = Number(xlm);
            // updating admin balance
            let admin = await Admin.findOne({ AccountId: process.env.ADMIN_ACCOUNT_ID })
            admin.Balance = Number(admin.Balance) + xlmAmount;;
            await admin.save();
            // updating User balance
            user.Balance = Number(user.Balance) - xlmAmount;
            await user.save();

            let date = new Date();
            let transportBooking; //fetching the transport which is being in process for booking by user 
            try {
                transportBooking = await BookingTransport.findOne({ transportId: transportId });
            } catch (error) {
                return next(error);
            }

            let transportBooked; //checking that this transport booked information by that user is already in database or not
            try {
                transportBooked = await BookTransport.findOne({ transportId: transportBooking.transportId, bookerEmail: transportBooking.bookerEmail })
            } catch (error) {
                return next(error);
            }

            if (transportBooked) {
                transportBooked.BooksCount = transportBooked.BooksCount + 1;
                booksCount = transportBooked.BooksCount
                return res.status(400).json({ success, message: "Transport already booked and existed " });
            }
            let maxBookedTransportNo;  //incrementing the booked transport value if its already booked by user some other time 
            try {
                const maxTransportBooking = await BookTransport.findOne({}, { bookedTransportNo: 1 }, { sort: { bookedTransportNo: -1 } });
                if (maxTransportBooking) {
                    maxBookedTransportNo = maxTransportBooking.bookedTransportNo;
                } else {
                    maxBookedTransportNo = 0; // If no bookings exist yet, set the initial value
                }
            } catch (error) {
                return next(error);
            }
            try {//adding booked transport information in database
                const newBookedTransportNo = maxBookedTransportNo + 1;
                transportBooked = new BookTransport({ bookedTransportNo: newBookedTransportNo, transportId: transportBooking.transportId, image: transportBooking.image, carName: transportBooking.carName, prices: transportBooking.prices, seats: transportBooking.seats, checkInDate: transportBooking.checkInDate, travelers: transportBooking.travelers, bookerName: transportBooking.bookerName, bookerEmail: transportBooking.bookerEmail, bookerPhone: transportBooking.bookerPhone, bookerAddress: transportBooking.bookerAddress, suggestion: transportBooking.suggestion, bookerId: transportBooking.transportId, members: transportBooking.members, days: transportBooking.days, buyDate: date, BooksCount: booksCount });
                transportBooked = await transportBooked.save();

            } catch (error) {
                return next(error);
            }
            let transportHistory;
            try {//checking booked transport information in booked tour history that its already present or not
                transportHistory = await TransportBookingHistory.findOne({ transportId: transportId });
            } catch (error) {
                return next(error);
            }
            if (transportHistory) {

                return res.status(400).json({ success: false, message: "Transport already existed " });
            }

            let transport;
            try {
                transport = await Transport.findById(transportBooking.transportId);
                const checkIn = new Date(transportBooking.checkInDate);

                // Calculate the checkout date by adding the number of days
                const checkout = new Date(checkIn);
                checkout.setDate(checkout.getDate() + transportBooking.days);

                // Format the checkout date as YYYY-MM-DD
                const checkoutDate = checkout.toISOString().split('T')[0];

                transportHistory = new TransportBookingHistory({ transportId: transportBooking.transportId, image: transportBooking.image, carName: transportBooking.carName, checkOutDate: checkoutDate, bookingDate: transportBooking.checkInDate, bookersName: transportBooking.bookerName, bookersId: transportBooking.bookerId })
                await transportHistory.save();
                transport.bookers.push(user.id);
                transport.bookings.push(transportBooking.checkInDate); //updating attributes information of collections in database
                user.bookedTransport.push(transportBooking.transportId)
                await transport.save();//saving data after updating 
                await user.save();
            } catch (error) {
                return next(error);
            }

            if (!transport) {

                return res.status(400).json({ success: false, message: "Transport not existed " });
            }
            let transportBill, deliveryCharges = "free";

            try {
                //saving bill information and updating database data
                let date = new Date();
                transportBill = new TransportBill({ booking: transportBooked.id, bookerId: user.id, senderAccountId: user.AccountId, ReceiverAccountId: process.env.ADMIN_ACCOUNT_ID, booker: user.name, deliveryCharges: deliveryCharges, totalPrice: transportBooking.prices, transportName: transportBooking.carName, date });
                transportBill = await transportBill.save();

                let notificationAdmin = new NotificationsAdmin({ accommodationName: user.name, Category: "transport booking payment", message: `one transport ${transportBooking.carName} is booked just now and payment happened `, date: date })
                await notificationAdmin.save();
                let notificationUser = new NotificationsUser({ accommodationName: user.name, Category: "transport booking payment", message: `${user.name} you did payment of this transport ${transportBooking.carName}....`, date: date })
                await notificationUser.save();
            } catch (error) {
                console.log(error)
                return next(error);
            }
            return res.status(200).json({ success: true, message: "Payment Successful", response: response, transportBooked: transportBooked, transportBill: transportBill });
        } catch (error) {

            return res.status(400).json({ success: false, message: "Payment error", error: error });
        }

    } catch (error) {
        console.log(error)
    }

};

export const countTransports = async (req, res, next) => {
    let TransportCounter;
    try {
        TransportCounter = await Transport.find().estimatedDocumentCount();  //counting total transport
    } catch (error) {
        return next(error);
    }

    if (!TransportCounter) {
        return res.status(400).json({ success: false, message: "no Transports found" })
    }

    res.status(200).json({ success: true, message: "here is your Transport count", TransportCounter: TransportCounter })
}
export const searchTransport = async (req, res, next) => {
    let { name } = req.body;
    let Transports;
    try {
        Transports = await Transport.find({ name: name });  //search transport through name
    } catch (error) {
        return next(error);
    }

    if (!Transports) {
        success = false;
        return res.status(400).json({ success, message: "no Transports found in database" })
    }

    const filteredTransports = Transports.filter((Transport) =>
        Transport.name.toLowerCase().includes(name.toLowerCase())
    );

    return res.status(200).json({ success: true, message: "here are your all Transports", filteredTransports: filteredTransports })
}
// const catchAsync=fn=>{
//     return(req,res,next)=>{
//         fn(req,res,next).catch(next)
//     }
// }
// class appError extends Error{
//     constructor(message,statusCode){
//         super(message)
//         this.statusCode=statusCode
//         this.isOperational=true;
//         this.status=`${statusCode}`.startsWith(4)?'fail':'error',
//         this.captureStackTrace(this,this.constructor)
//     }
// }
// app.all('*',(req,res,next)=>{
//     return next(new appError('This route not exists',400))
// })
// const errorProd=(err,res)=>{
//     if(err.isOperational)
//     res.status(err.statusCode).json({
//         message:err.message,
//         status:err.status,

//     })
// }
// const errorDev=(err,res)=>{
//     res.status(err.statusCode).json({
//         message:err.message,
//         status:err.status,
//         error:err,
//         stackTrace:err.stack
//     })
// }
// const getValidationError=err=>{
//     const error=Object.values(err.error).map(el=>message[el])
//     const message=`User ${error}`;
//     return new appError(message,404)
// }
// const castError=err=>{
//     const message=`Invalid ${err.path}:${err.value}`;
//     return new appError(message,400)
// }
// const duplicateKeyError=err=>{
//     const value=Object.keys(err.keyPatteran)[0];
//     const message=`Duplicate ${value}`;
//     return new appError(message,400)
// }
// module.exports=(err,req,res,next)=>{
//    let error={...err};
//    if(process.env.NODE_DEV='production'){
//     if(error.statusCode===500){
//         error=duplicateKeyError(error)
//     }
//     if(error.name==='CastError'){
//         error=castError(error)
//     }
//     if(error.ValidationError){
//         error=getValidationError;
//     }
// errorProd(err,res)
//    }else if(process.env.NODE_DEV='development'){
//     errorDev(err,res)
//    }
// }