import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import express, { response } from 'express';
import Admin from '../Models/Admin.js';
import Categorie from '../Models/Categorie.js';
import Hotels from '../Models/Hotels.js';
import Room from '../Models/Room.js';

const app = express();
dotenv.config();

let success = null;

export const addHotel = async (req, res, next) => {
    let hotelNo = 0;
    let { name, prices, roomCount, description, image, gallery, features, location, reviews, rooms, available } = req.body;
    let existingHotel;
    try {
        existingHotel = await Hotels.findOne({ name: name });

    } catch (error) {
        return next(error);
    }
    if (existingHotel) {
        success = false;
        return res.status(400).json({ success, message: "Hotel already existed " });
    }
    let hotel;
    try {
        hotelNo = hotelNo + 1;
        hotel = new Hotels({ hotelNo, name, prices, roomCount, description, image, gallery, features, location, reviews, rooms, available });
        hotel = await hotel.save();
    } catch (error) {
        return next(error);
    }
    return res.status(200).json({ success: true, message: "New Hotel is created", hotel: hotel });

};
export const getHotel = async (req, res, next) => {

    let Hotels;
    try {
        Hotels = await Hotels.find();
    } catch (error) {
        return next(error);
    }

    if (!Hotels) {
        success = false;
        return res.status(400).json({ success, message: "no Hotels found in database" })
    }

    return res.status(200).json({ success: true, message: "here are your all Hotels", Hotels: Hotels })
}

export const deleteHotel = async (req, res, next) => {
    let id = req.params.id;

    let adminId = req.userId;
    let deleteHotel;
    try {
        deleteHotel = await Hotels.findByIdAndDelete(id);
    } catch (error) {
        return next(error);
    }

    if (!deleteHotel) {
        success = false;
        return res.status(400).json({ success, message: "Hotel not existed that u are trying to delete" });
    }
    success = true;
    return res.status(200).json({ success, message: "Hotel deleted successfully", deleteHotel: deleteHotel, admin: adminId })
}

export const updateHotel = async (req, res, next) => {
    let id = req.params.id;
    const { name, prices, roomCount, description, newImage, newFeature, location, available } = req.body;

    let Hotel;
    try {
        Hotel = await Hotels.findById(id);
    } catch (error) {
        return next(error);
    }

    if (!Hotel) {
        return res.status(400).json({ success: false, message: "Hotel not existed" });
    }

    // Update hotel information
    Hotel.name = name || Hotel.name;
    Hotel.prices = prices || Hotel.prices;
    Hotel.roomCount = roomCount || Hotel.roomCount;
    Hotel.description = description || Hotel.description;
    Hotel.location = location || Hotel.location;
    Hotel.available = available || Hotel.available;
    Hotel.image = image || Hotel.image;

    if (newImage) {
        Hotel.gallery.push(newImage);
    }

    if (newFeature) {
        Hotel.features.push(newFeature);
    }



    await Hotel.save();
    return res.status(200).json({ success: true, message: 'Hotel updated successfully', Hotel: Hotel });


}
export const getHotelRooms = async (req, res, next) => {
    let id = req.params.id;
    let rooms;
    try {
        rooms = await Room.findOne({ hotelId: id });
    } catch (error) {
        return next(error);
    }

    if (!rooms) {
        success = false;
        return res.status(400).json({ success, message: "no rooms found in database" })
    }

    return res.status(200).json({ success: true, message: "here are your all rooms", Hotels: Hotels })
}

export const countHotels = async (req, res, next) => {
    let HotelCount;
    try {

        HotelCount = await Hotels.find().estimatedDocumentCount();

    } catch (error) {
        return next(error);
    }

    if (!HotelCount) {
        success = false;
        return res.status(400).json({ success, message: "no Hotel found" })
    }
    success = true
    res.status(200).json({ success, message: "here is your Hotel count", HotelCount: HotelCount })
}