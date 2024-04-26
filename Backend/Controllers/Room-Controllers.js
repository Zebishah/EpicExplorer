import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import express, { response } from 'express';
import Admin from '../Models/Admin.js';
import Categorie from '../Models/Categorie.js';
import Hotels from '../Models/Hotels.js';
import Room from '../Models/Room.js';
import ItServicesHotel from '../Models/ItServicesHotel.js';
import BookingHotel from '../Models/BookingHotel.js';
import makingRoomBill from '../Models/makingRoomBill.js';
import BookHotel from '../Models/BookHotel.js';
import HotelBookingHistory from '../Models/HotelBookingHistory.js';
import RoomBill from '../Models/RoomBill.js';
import StellarSdk from 'stellar-sdk';
import { Server } from 'stellar-sdk/lib/horizon/server.js';
import StellarTransaction from '../Utils/Transaction.js';
const server = new Server("https://horizon-testnet.stellar.org/");
const app = express();
dotenv.config();
let booksCount = 0, bookedRoomNo = 0;
let success = null;
let roomNo = 0, billNo = 0;
export const addRoom = async (req, res, next) => {
    let adminId = req.userId;

    let { hotelId, name, prices, type, description, image, gallery, features, location, reviews, bookers, noOfGuests, available, bookings, bookedCount } = req.body;

    let admin = req.admin;
    let existingRoom;
    try {
        existingRoom = await Room.findOne({ name: name });

    } catch (error) {
        return next(error);
    }
    if (existingRoom) {
        success = false;
        return res.status(400).json({ success, message: "Room already existed " });
    }
    let room;
    try {
        roomNo = roomNo + 1;
        room = new Room({ roomNo, hotelId, name, prices, type, description, image, gallery, features, location, reviews, bookers, noOfGuests, available, bookings, bookedCount });
        room = await room.save();
    } catch (error) {
        return next(error);
    }
    let hotel;
    try {
        hotel = await Hotels.findById(hotelId);
        hotel.rooms.push(room);
        await hotel.save();

    } catch (error) {
        return next(error);
    }
    if (!hotel) {
        success = false;
        return res.status(400).json({ success, message: "Hotel not found " });
    }
    return res.status(200).json({ success: true, message: "New Room is created", Room: room });


};
export const getRoom = async (req, res, next) => {

    let Rooms;
    try {
        Rooms = await Room.find();
    } catch (error) {
        return next(error);
    }

    if (!Rooms) {
        success = false;
        return res.status(400).json({ success, message: "no Rooms found in database" })
    }

    return res.status(200).json({ success: true, message: "here are your all Rooms", Rooms: Rooms })
}

export const deleteRoom = async (req, res, next) => {
    let id = req.params.id;

    let adminId = req.userId;

    let deletedRoom;
    try {
        deletedRoom = await Room.findByIdAndDelete(id);
    } catch (error) {
        return next(error);
    }

    if (!deletedRoom) {
        success = false;
        return res.status(400).json({ success, message: "Room not existed that u are trying to delete" });
    }
    success = true;
    return res.status(200).json({ success, message: "Room deleted successfully", deletedRoom: deletedRoom, admin: adminId })
}

export const updateRoom = async (req, res, next) => {
    let id = req.params.id;
    const { name, prices, type, description, newImage, image, newFeature, location, available } = req.body;

    let room;
    try {
        room = await Room.findById(id);
    } catch (error) {
        return next(error);
    }

    if (!room) {
        return res.status(400).json({ success: false, message: "room not existed" });
    }

    // Update tour information
    room.name = name || room.name;
    room.prices = prices || room.prices;
    room.type = type || room.type;
    room.description = description || room.description;
    room.location = location || room.location;
    room.available = available || room.available;
    room.image = image || room.image;

    if (newImage) {
        room.gallery.push(newImage);
    }

    if (newFeature) {
        room.features.push(newFeature);
    }



    await room.save();
    return res.status(200).json({ success: true, message: 'room updated successfully', room: room });


}

export const openRoom = async (req, res, next) => {
    let id = req.params.id;
    let room;
    try {
        room = await Room.findById(id);
    } catch (error) {
        return next(error);
    }

    if (!room) {
        success = false;
        return res.status(400).json({ success, message: "room not existed that u are trying to open" });
    }

    let roomServiceIt;
    try {
        roomServiceIt = await ItServicesHotel.findOne({ roomId: id });
    } catch (error) {
        return next(error);
    }

    if (!roomServiceIt) {
        success = false;
        return res.status(400).json({ success, message: "room not existed that u are trying to open" });
    }

    return res.status(200).json({ success: true, room: room, roomServiceIt: roomServiceIt });

}

export const getFormData = async (req, res, next) => {

    let id = req.params.id;
    let { guests, bookerName, bookerEmail, bookerPhone, bookerAddress, suggestion, days, members } = req.body;
    let user = await req.user;
    console.log(user)
    let room;
    try {
        room = await Room.findById(id);
    } catch (error) {
        return next(error);
    }

    if (!room) {
        success = false;
        return res.status(400).json({ success, message: "room not existed that u are trying to open" });
    }
    let date = new Date();
    let roomBookingCheck;
    try {
        roomBookingCheck = await BookingHotel.findOne({ roomId: room.id, bookerEmail: user.email })
    } catch (error) {
        return next(error);
    }

    if (roomBookingCheck) {
        booksCount = booksCount + 1;
        return res.status(400).json({ success, message: "room already existed in booking database" });
    }
    let roomBooking;
    room.prices = room.prices * days;
    try {
        // tourNo = tourNo + 1;
        roomBooking = new BookingHotel({ hotelId: room.hotelId, roomId: room.id, roomName: room.name, image: room.image, roomPrice: room.prices, roomType: room.type, checkInDate: date, guests: guests, bookerName, bookerEmail, bookerPhone, bookerAddress, suggestion, bookerId: user.id, members, days });
        roomBooking = await roomBooking.save();

    } catch (error) {
        return next(error);
    }
    let bill, deliveryCharges = "free";

    try {
        billNo = billNo + 1;
        bill = new makingRoomBill({ booking: roomBooking.id, bookerId: user.id, booker: user.name, deliveryCharges: deliveryCharges, totalPrice: room.prices, roomName: room.name, date });
        bill = await bill.save();

    } catch (error) {
        return next(error);
    }

    return res.status(200).json({ success: true, message: "New Room booking start do payment", bill: bill, roomBooking: roomBooking });


};

export const roomPayment = async (req, res, next) => {

    const { amount } = req.body;
    let user = await req.user;

    let roomId = req.params.id;
    const xlm = Number.parseFloat(amount).toFixed(7);
    const userSecretKey = user.SecretSeed;
    const userKeypair = StellarSdk.Keypair.fromSecret(userSecretKey);

    // Admin account's public key
    const userPublicKey = userKeypair.publicKey();


    try {

        // Transaction to add balance to the admin account

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
            let roomBooking;
            try {
                // tourNo = tourNo + 1;
                roomBooking = await BookingHotel.findOne({ roomId: roomId });
            } catch (error) {
                return next(error);
            }

            let roomBooked;
            try {
                roomBooked = await BookHotel.findOne({ roomId: roomBooking.roomId, bookerEmail: user.email })
            } catch (error) {
                return next(error);
            }

            if (roomBooked) {
                roomBooking.BooksCount = roomBooking.BooksCount + 1;
                booksCount = tourBooked.BooksCount;
                return res.status(400).json({ success, message: "room already booked and existed " });
            }
            let maxBookedRoomNo;
            try {
                const maxRoomBooking = await BookHotel.findOne({}, { bookedRoomNo: 1 }, { sort: { bookedRoomNo: -1 } });
                if (maxRoomBooking) {
                    maxBookedRoomNo = maxRoomBooking.bookedRoomNo;
                } else {
                    maxBookedRoomNo = 0; // If no bookings exist yet, set the initial value
                }
            } catch (error) {
                return next(error);
            }
            try {
                // tourNo = tourNo + 1;
                const newBookedRoomNo = maxBookedRoomNo + 1;

                roomBooked = new BookHotel({ bookedRoomNo: newBookedRoomNo, hotelId: roomBooking.hotelId, image: roomBooking.image, roomName: roomBooking.roomName, roomId: roomBooking.roomId, roomPrice: roomBooking.roomPrice, roomType: roomBooking.roomType, checkoutDate: date, checkInDate: roomBooking.checkInDate, guests: roomBooking.guests, bookerName: roomBooking.bookerName, bookerEmail: roomBooking.bookerEmail, bookerPhone: roomBooking.bookerPhone, bookerAddress: roomBooking.bookerAddress, suggestion: roomBooking.suggestion, bookerId: roomBooking.bookerId, members: roomBooking.members, days: roomBooking.days, BooksCount: booksCount });

                roomBooked = await roomBooked.save();


            } catch (error) {
                return next(error);
            }
            let roomHistory;
            try {
                // tourNo = tourNo + 1;
                roomHistory = await HotelBookingHistory.findOne({ roomId: roomId });
            } catch (error) {
                return next(error);
            }
            if (roomHistory) {

                return res.status(400).json({ success, message: "room already existed " });
            }

            let room;
            const checkIn = new Date(roomBooking.checkInDate);

            // Calculate the checkout date by adding the number of days
            if (isNaN(checkIn.getTime())) {
                throw new Error('Invalid check-in date');
            }

            const checkout = new Date(checkIn);
            console.log('Before:', checkout.toISOString()); // Log the initial checkout date

            checkout.setDate(checkout.getDate() + roomBooking.days);
            console.log('After:', checkout.toISOString()); // Log the updated checkout date

            const checkoutDate = checkout.toISOString().split('T')[0];

            try {
                room = await Room.findById(roomBooking.roomId);
                roomHistory = new HotelBookingHistory({ hotelId: roomBooking.hotelId, roomId: roomBooking.roomId, image: roomBooking.image, roomName: roomBooking.roomName, bookingDate: roomBooking.checkInDate, bookerName: roomBooking.bookerName, bookerId: roomBooking.bookerId, checkoutDate: checkoutDate })
                await roomHistory.save();
                room.bookers.push(user.id);
                room.bookings.push(roomBooking.checkInDate);
                user.bookedHotels.push(roomBooking.roomId)
                await room.save();
                await user.save();
            } catch (error) {
                console.log(error)
                return next(error);
            }

            if (!room) {
                success = false;
                return res.status(400).json({ success, message: "room not existed" });
            }
            let roomBill, deliveryCharges = "free";

            try {
                billNo = billNo + 1;
                roomBill = new RoomBill({ booking: roomBooked.roomId, bookerId: user.id, senderAccountId: user.AccountId, ReceiverAccountId: process.env.ADMIN_ACCOUNT_ID, booker: user.name, deliveryCharges: deliveryCharges, totalPrice: room.prices, roomName: room.name, date });
                roomBill = await roomBill.save();
                await BookingHotel.findOneAndDelete({ roomId: roomBooking.roomId, bookerId: user.id });
                await makingRoomBill.findOneAndDelete({ bookerId: user.id, booking: roomBooking.id })
            } catch (error) {
                console.log(error)
                return next(error);
            }
            return res.status(200).json({ success: true, message: "Payment Successful", response: response, roomBooked: roomBooked, roomBill: roomBill });
        } catch (error) {

            return res.status(400).json({ success: false, message: "Payment error", error: error });
        }

    } catch (error) {
        console.log(error)
    }

};

export const countRooms = async (req, res, next) => {
    let RoomCount;
    try {

        RoomCount = await Room.find().estimatedDocumentCount();

    } catch (error) {
        return next(error);
    }

    if (!RoomCount) {
        success = false;
        return res.status(400).json({ success, message: "no Room found" })
    }
    success = true
    res.status(200).json({ success, message: "here is your Room count", RoomCount: RoomCount })
}

export const searchRoom = async (req, res, next) => {
    let { name } = req.body;
    let Rooms;
    try {
        Rooms = await Room.find({ name: name });
    } catch (error) {
        return next(error);
    }

    if (!Rooms) {
        success = false;
        return res.status(400).json({ success, message: "no Rooms found in database" })
    }

    const filteredRooms = Rooms.filter((Room) =>
        Room.name.toLowerCase().includes(name.toLowerCase())
    );

    return res.status(200).json({ success: true, message: "here are your all Rooms", filteredRooms: filteredRooms })
}
