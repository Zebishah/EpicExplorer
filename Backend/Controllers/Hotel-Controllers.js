import dotenv from 'dotenv';
import express, { response } from 'express';
import Admin from '../Models/Admin.js';
import Hotels from '../Models/Hotels.js';
import Room from '../Models/Room.js';

const app = express();
dotenv.config();

let success = null;

export const addHotel = async (req, res, next) => {

    let { name, prices, roomCount, description, image, gallery, features, location, reviews, rooms, available } = req.body;
    let existingHotel;
    try {
        existingHotel = await Hotels.findOne({ name: name });

    } catch (error) {
        return next(error);
    }
    if (existingHotel) {

        return res.status(400).json({ success: false, message: "Hotel already existed ", statusCode: 400 });
    }
    let hotel;
    try {

        hotel = new Hotels({ name, prices, roomCount, description, image, gallery, features, location, reviews, rooms, available });
        hotel = await hotel.save();
    } catch (error) {
        return next(error);
    }
    return res.status(200).json({ success: true, message: "New Hotel is created", hotel: hotel, statusCode: 200 });

};
export const getHotel = async (req, res, next) => {

    let Hotels;
    try {
        Hotels = await Hotels.find();
    } catch (error) {
        return next(error);
    }

    if (!Hotels) {
        return res.status(400).json({ success: false, message: "no Hotels found in database", statusCode: 400 })
    }

    return res.status(200).json({ success: true, message: "here are your all Hotels", Hotels: Hotels, statusCode: 200 })
}

export const deleteHotel = async (req, res, next) => {
    let id = req.params.id;
    let deleteHotel;
    try {
        deleteHotel = await Hotels.findByIdAndDelete(id);
    } catch (error) {
        return next(error);
    }
    if (!deleteHotel) {
        return res.status(400).json({ success: false, message: "Hotel not existed that u are trying to delete", statusCode: 400 });
    }
    return res.status(200).json({ success: true, message: "Hotel deleted successfully", deleteHotel: deleteHotel, statusCode: 200 })
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
        return res.status(400).json({ success: false, message: "Hotel not existed", statusCode: 400 });
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
    return res.status(200).json({ success: true, message: 'Hotel updated successfully', Hotel: Hotel, statusCode: 200 });
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
        return res.status(400).json({ success: false, message: "no rooms found in database", statusCode: 400 })
    }

    return res.status(200).json({ success: true, message: "here are your all rooms", Hotels: Hotels, statusCode: 200 })
}

export const countHotels = async (req, res, next) => {
    let HotelCount;
    try {
        HotelCount = await Hotels.find().estimatedDocumentCount();
    } catch (error) {
        return next(error);
    }

    if (!HotelCount) {
        return res.status(400).json({ success: false, message: "no Hotels found", statusCode: 400 })
    }

    res.status(200).json({ success: true, message: "here is your Hotel count", HotelCount: HotelCount, statusCode: 200 })
}