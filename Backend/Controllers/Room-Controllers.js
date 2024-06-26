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
import NotificationsAdmin from '../Models/NotificationsAdmin.js';
import NotificationsUser from '../Models/NotificationsUser.js';
import notifyUsers from '../Utils/NotifyUser.js';
const server = new Server("https://horizon-testnet.stellar.org/");
const app = express();
dotenv.config();
let booksCount = 0;
let success = null;
export const addRoom = async (req, res, next) => {

    //fetching data from request body
    let { hotelId, name, prices, type, description, image, gallery, features, location, reviews, bookers, noOfGuests, available, bookings, bookedCount } = req.body;

    let existingRoom;  //checking that this room is already existed in database or not 
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
        //creating new room in a hotel
        room = new Room({ hotelId, name, prices, type, description, image, gallery, features, location, reviews, bookers, noOfGuests, available, bookings, bookedCount });
        room = await room.save();
    } catch (error) {
        return next(error);
    }
    let hotel;
    try {
        //adding room in specific hotel record
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

    let date = new Date();

    let notificationAdmin = new NotificationsAdmin({ accommodationName: "Room Added Successfully", Category: "Room Added", message: `One Room ${name} is added to our site`, date });
    await notificationAdmin.save();

    let data = {
        type: 'Room Added',
        message: `${name} Room is Added Successfully`,
        date: date,
        title: "Room Added Successfully"

    };

    notifyUsers(data);
    let notificationUser = new NotificationsUser({ user: "no", broadCast: "yes", accommodationName: "Room Added Successfully", Category: "Room Added", message: `${name} Room is Added Successfully`, });
    await notificationUser.save();

    return res.status(200).json({ success: true, message: "New Room is created", Room: room });


};
export const getRoom = async (req, res, next) => {

    let Rooms;
    try {
        Rooms = await Room.find();//fetching rooms
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

    let id = req.params.id;//fetching id from params
    let adminId = await req.userId;
    let deletedRoom;
    try {
        deletedRoom = await Room.findByIdAndDelete(id);//deleting given id room
    } catch (error) {
        return next(error);
    }

    if (!deletedRoom) {
        return res.status(400).json({ success: false, message: "Room not existed that u are trying to delete" });
    }

    let date = new Date();

    let notificationAdmin = new NotificationsAdmin({ accommodationName: "Room deleted Successfully", Category: "Room deleted", message: `One Room ${deletedRoom.name} is deleted from our site`, date });
    await notificationAdmin.save();

    let data = {
        type: 'Room Deleted',
        message: `${deletedRoom.name} Room is deleted Successfully`,
        date: date,
        title: "Room Deleted Successfully"

    };

    notifyUsers(data);
    let notificationUser = new NotificationsUser({ user: "no", broadCast: "yes", accommodationName: "Room Deleted Successfully", Category: "Room Deleted", message: `${deletedRoom.name} Room is deleted Successfully`, });
    await notificationUser.save();
    return res.status(200).json({ success: true, message: "Room deleted successfully", deletedRoom: deletedRoom, admin: adminId })
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

    // Update Room information
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
    let date = new Date();
    let notificationAdmin = new NotificationsAdmin({ accommodationName: "Room info Successfully", Category: "Room Updated", message: `${name} Room info updated successfully`, date });
    await notificationAdmin.save();
    return res.status(200).json({ success: true, message: 'room updated successfully', room: room });


}

export const openRoom = async (req, res, next) => {
    let id = req.params.id;
    let room;
    try {
        room = await Room.findById("665c88c717040dedf2b58a49");

    } catch (error) {
        return next(error);
    }

    if (!room) {
        success = false;
        return res.status(400).json({ success, message: "room not" });
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
        roomBooking = new BookingHotel({ hotelId: room.hotelId, roomId: room.id, roomName: room.name, image: room.image, roomPrice: room.prices, roomType: room.type, checkInDate: date, guests: guests, bookerName, bookerEmail, bookerPhone, bookerAddress, suggestion, bookerId: user.id, members, days });
        roomBooking = await roomBooking.save();

    } catch (error) {
        return next(error);
    }
    let bill, deliveryCharges = "free";
    try {
        bill = new makingRoomBill({ booking: roomBooking.id, bookerId: user.id, booker: user.userName, deliveryCharges: deliveryCharges, totalPrice: room.prices, roomName: room.name, date });
        bill = await bill.save();

    } catch (error) {
        return next(error);
    }

    return res.status(200).json({ success: true, message: "New Room booking start do payment", bill: bill, roomBooking: roomBooking });
};

export const roomPayment = async (req, res, next) => {

    const { amount } = req.body;
    //fetching user
    let user = await req.user;
    //fetching room id from params
    let roomId = req.params.id;
    //converting amount in xlm
    const xlm = Number.parseFloat(amount).toFixed(7);
    const userSecretKey = user.SecretSeed;
    const userKeyPair = StellarSdk.Keypair.fromSecret(userSecretKey);

    // Admin account's public key
    const userPublicKey = userKeyPair.publicKey();

    let date = new Date();

    try {

        // Transaction to add balance to the admin account

        const account = await server.loadAccount(userPublicKey);
        //checking user balance
        if (parseFloat(account.balances[0].balance) < xlm) {
            return res.status(400).json({ success: false, message: 'Insufficient balance go and add balance in ur stellar account by paying ', balance: account.balances[0].balance });
        }
        let destinationAcc = process.env.ADMIN_ACCOUNT_ID;
        const response = await StellarTransaction(account, xlm, userKeyPair, destinationAcc);
        try {

            const xlm = (Number.parseFloat(amount).toFixed(7));
            const xlmAmount = Number(xlm);
            //updating admin balance
            let admin = await Admin.findOne({ AccountId: process.env.ADMIN_ACCOUNT_ID })
            admin.Balance = Number(admin.Balance) + xlmAmount;;
            await admin.save();
            //updating user balance
            user.Balance = Number(user.Balance) - xlmAmount;
            await user.save();

            let date = new Date();
            let roomBooking;//fetching the room which is being in process for booking by user 
            try {

                roomBooking = await BookingHotel.findOne({ roomId: roomId });
            } catch (error) {
                return next(error);
            }

            let roomBooked; //checking that this room booked information by that user is already in database or not 
            try {
                roomBooked = await BookHotel.findOne({ roomId: roomBooking.roomId, bookerEmail: user.email })
            } catch (error) {
                return next(error);
            }

            if (roomBooked) {
                roomBooked.BooksCount = roomBooking.BooksCount + 1;
                booksCount = roomBooked.BooksCount;
                return res.status(400).json({ success, message: "room already booked and existed " });
            }
            let maxBookedRoomNo;//incrementing the booked room value if its already booked by user some other time 
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
                //adding booked room information in database
                const newBookedRoomNo = maxBookedRoomNo + 1;

                roomBooked = new BookHotel({ bookedRoomNo: newBookedRoomNo, hotelId: roomBooking.hotelId, image: roomBooking.image, roomName: roomBooking.roomName, roomId: roomBooking.roomId, roomPrice: roomBooking.roomPrice, roomType: roomBooking.roomType, checkoutDate: date, checkInDate: roomBooking.checkInDate, guests: roomBooking.guests, bookerName: roomBooking.bookerName, bookerEmail: roomBooking.bookerEmail, bookerPhone: roomBooking.bookerPhone, bookerAddress: roomBooking.bookerAddress, suggestion: roomBooking.suggestion, bookerId: roomBooking.bookerId, members: roomBooking.members, days: roomBooking.days, BooksCount: booksCount });

                roomBooked = await roomBooked.save();


            } catch (error) {
                return next(error);
            }
            let roomHistory;
            try {
                //checking booked room information in booked  history that its already present or not
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
                roomHistory = new HotelBookingHistory({ hotelId: roomBooking.hotelId, roomId: roomBooking.roomId, amount: roomBooking.roomPrice, roomName: roomBooking.roomName, bookingDate: roomBooking.checkInDate, bookerName: roomBooking.bookerName, bookerEmail: roomBooking.bookerEmail })
                await roomHistory.save();
                room.bookers.push(user.id);
                room.bookings.push(roomBooking.checkInDate);//updating attributes information of collections in database
                user.bookedHotels.push(roomBooking.roomId)
                await room.save();//saving data after updating 
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
                //saving bill information and updating database data 
                roomBill = new RoomBill({ booking: roomBooked.roomId, bookerId: user.id, senderAccountId: user.AccountId, ReceiverAccountId: process.env.ADMIN_ACCOUNT_ID, booker: user.userName, deliveryCharges: deliveryCharges, totalPrice: room.prices, roomName: room.name, date });
                roomBill = await roomBill.save();
                await BookingHotel.findOneAndDelete({ roomId: roomBooking.roomId, bookerId: user.id });
                await makingRoomBill.findOneAndDelete({ bookerId: user.id, booking: roomBooking.id })
            } catch (error) {
                console.log(error)
                return next(error);
            }
            let delHotelBooking; //fetching the transport which is being in process for booking by user 
            try {
                delHotelBooking = await BookingHotel.findOneAndDelete({ roomId: roomId });
            } catch (error) {
                return next(error);
            }

            let delHotelBill; //fetching the transport which is being in process for booking by user 
            try {
                delHotelBill = await makingRoomBill.findOneAndDelete({ bookerId: user.id });
            } catch (error) {
                return next(error);
            }
            let notificationAdmin = new NotificationsAdmin({ accommodationName: "Room Payment  Successfully", Category: "Room Payment", message: `one user ${roomHistory.bookerName} booked ${roomHistory.name} room from our site and did Payment successfully `, date: date })
            await notificationAdmin.save();

            let data = {
                type: 'Room Payment',
                message: `${roomHistory.bookerName} You booked ${roomHistory.name} room successfully`,
                date: date,
                title: "Room Payment Successfully"

            };

            notifyUsers(data);
            let notificationUser = new NotificationsUser({ user: user.userName, broadCast: "no", accommodationName: "Room Payment Successfully", Category: "Room Payment", message: `${roomHistory.bookerName} You booked ${roomHistory.name} room successfully` });
            await notificationUser.save();
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

export const searchRoomByName = async (req, res, next) => {
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
    return res.status(200).json({ success: true, message: "here are your all Rooms", Rooms: Rooms })
}
export const searchRoomById = async (req, res, next) => {
    let id = req.body.id;
    console.log(id);
    let Rooms;
    try {
        Rooms = await BookHotel.find({ roomId: id });
    } catch (error) {
        return next(error);
    }

    if (!Rooms) {
        success = false;
        return res.status(400).json({ success, message: "no Rooms found in database" })
    }


    return res.status(200).json({ success: true, message: "here are your all Rooms", Rooms: Rooms })
}