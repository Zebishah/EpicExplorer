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
const server = new Server("https://horizon-testnet.stellar.org/");
const app = express();
dotenv.config();

let success = null;
let bookedTransportNo = 0, bookedCount = 0;
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
        success = false;
        return res.status(400).json({ success, message: "Transport not existed that u are trying to delete" });
    }
    success = true;
    return res.status(200).json({ success, message: "Transport deleted successfully", deleteTransport: deleteTransport, admin: adminId })
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
        success = false;
        return res.status(400).json({ success, message: "transport not existed that u are trying to open" });
    }

    let transportServiceIt;
    try {
        transportServiceIt = await ItrenaryServicesTransport.findOne({ transportId: id });
    } catch (error) {
        return next(error);
    }

    if (!transportServiceIt) {
        success = false;
        return res.status(400).json({ success, message: "Transport not existed that u are trying to open" });
    }

    return res.status(200).json({ success: true, transport: transport, transportServiceIt: transportServiceIt });

}

export const getFormData = async (req, res, next) => {

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
    transport.prices = transport.prices * days;
    try {
        // tourNo = tourNo + 1;
        transportBooking = new BookingTransport({ transportId: transport.id, carName: transport.carName, prices: transport.prices, checkInDate: date, travelers, bookerName, bookerEmail, bookerPhone, bookerAddress, suggestion, bookerId: user.id, members, days, seats, image: transport.image });
        transportBooking = await transportBooking.save();

    } catch (error) {
        return next(error);
    }
    let bill, billNo = 0, deliveryCharges = "free";

    try {
        billNo = billNo + 1;
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
    const userKeypair = StellarSdk.Keypair.fromSecret(userSecretKey);

    // Admin account's public key
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

            let date = new Date();
            let transportBooking;
            try {
                // tourNo = tourNo + 1;
                transportBooking = await BookingTransport.findOne({ transportId: transportId });
            } catch (error) {
                return next(error);
            }

            let transportBooked;
            try {
                transportBooked = await BookTransport.findOne({ transportId: transportBooking.transportId, bookerEmail: transportBooking.bookerEmail })
            } catch (error) {
                return next(error);
            }

            if (transportBooked) {
                transportBooked.BooksCount = transportBooked.BooksCount + 1;
                booksCount = tourBooked.BooksCount
                return res.status(400).json({ success, message: "Tour already booked and existed " });
            }
            let maxBookedTransportNo;
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
            try {
                const newBookedTransportNo = maxBookedTransportNo + 1;
                transportBooked = new BookTransport({ bookedTransportNo: newBookedTransportNo, transportId: transportBooking.transportId, image: transportBooking.image, carName: transportBooking.carName, prices: transportBooking.prices, seats: transportBooking.seats, checkInDate: transportBooking.checkInDate, travelers: transportBooking.travelers, bookerName: transportBooking.bookerName, bookerEmail: transportBooking.bookerEmail, bookerPhone: transportBooking.bookerPhone, bookerAddress: transportBooking.bookerAddress, suggestion: transportBooking.suggestion, bookerId: transportBooking.transportId, members: transportBooking.members, days: transportBooking.days, buyDate: date, BooksCount: booksCount });
                transportBooked = await transportBooked.save();

            } catch (error) {
                return next(error);
            }
            let transportHistory;
            try {
                // tourNo = tourNo + 1;
                transportHistory = await TransportBookingHistory.findOne({ transportId: transportId });
            } catch (error) {
                return next(error);
            }
            if (transportHistory) {

                return res.status(400).json({ success, message: "Transport already existed " });
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
                transport.bookings.push(transportBooking.checkInDate);

                user.bookedTransport.push(transportBooking.transportId)
                await transport.save();
                await user.save();
            } catch (error) {
                return next(error);
            }

            if (!transport) {
                success = false;
                return res.status(400).json({ success, message: "Transport not existed " });
            }
            let transportBill, deliveryCharges = "free";

            try {

                transportBill = new TransportBill({ booking: transportBooked.id, bookerId: user.id, senderAccountId: user.AccountId, ReceiverAccountId: process.env.ADMIN_ACCOUNT_ID, booker: user.name, deliveryCharges: deliveryCharges, totalPrice: transportBooking.prices, transportName: transportBooking.carName, date });
                transportBill = await transportBill.save();
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

        TransportCounter = await Transport.find().estimatedDocumentCount();

    } catch (error) {
        return next(error);
    }

    if (!TransportCounter) {
        success = false;
        return res.status(400).json({ success, message: "no Transports found" })
    }
    success = true
    res.status(200).json({ success, message: "here is your Transport count", TransportCounter: TransportCounter })
}
export const searchTransport = async (req, res, next) => {
    let { name } = req.body;
    let Transports;
    try {
        Transports = await Transport.find({ name: name });
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
