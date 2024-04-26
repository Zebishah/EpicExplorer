import dotenv from 'dotenv';
import express, { response } from 'express';
import Bill from '../Models/Bill';
import TransportBill from '../Models/TransportBill';
import RoomBill from '../Models/RoomBill';
import { get } from 'mongoose';
const app = express();
dotenv.config();

let success = null;

export const getTourBill = async (req, res, next) => {
    let tourBill;
    try {
        tourBill = await Bill.find();
    } catch (error) {
        return next(error);
    }

    if (!tourBill) {
        success = false;
        return res.status(400).json({ success, message: "no tourBills are here" })
    }

    success = true;
    return res.status(200).json({ success, message: "here are your all tourBills", tourBill: tourBill })
}

export const getTransportBill = async (req, res, next) => {
    let transportBill;
    try {
        transportBill = await TransportBill.find();
    } catch (error) {
        return next(error);
    }

    if (!transportBill) {
        success = false;
        return res.status(400).json({ success, message: "no transportBills are here" })
    }

    success = true;
    return res.status(200).json({ success, message: "here are your all transportBills", transportBill: transportBill })
}

export const getHotelBill = async (req, res, next) => {
    let hotelBill;
    try {
        hotelBill = await RoomBill.find();
    } catch (error) {
        return next(error);
    }

    if (!hotelBill) {
        success = false;
        return res.status(400).json({ success, message: "no hotelBills are here" })
    }

    success = true;
    return res.status(200).json({ success, message: "here are your all hotelBills", hotelBill: hotelBill })
}

export const getUserHotelBill = async (req, res, next) => {
    let { booker } = req.body;

    let UserHotelBill;
    try {
        UserHotelBill = await RoomBill.find({ booker: booker });
    } catch (error) {
        return next(error);
    }

    if (!UserHotelBill) {
        success = false;
        return res.status(400).json({ success, message: "no UserHotelBill are here" })
    }

    success = true;
    return res.status(200).json({ success, message: "here are your all UserHotelBill", UserHotelBill: UserHotelBill })
}
export const getUserTourBill = async (req, res, next) => {
    let { booker } = req.body;
    let getUserTourBill;
    try {
        getUserTourBill = await Bill.find({ booker: booker });
    } catch (error) {
        return next(error);
    }

    if (!getUserTourBill) {
        success = false;
        return res.status(400).json({ success, message: "no getUserTourBill are here" })
    }

    success = true;
    return res.status(200).json({ success, message: "here are your all getUserTourBill", getUserTourBill: getUserTourBill })
}

export const getUserTransportBill = async (req, res, next) => {

    //extracting admin token and checking admin is valid or not
    let { booker } = req.body;

    let getUserTransportBill;
    try {
        getUserTransportBill = await TransportBill.find({ booker: booker });
    } catch (error) {
        return next(error);
    }

    if (!getUserTransportBill) {
        success = false;
        return res.status(400).json({ success, message: "no getUserTransportBill are here" })
    }

    success = true;
    return res.status(200).json({ success, message: "here are your all getUserTransportBill", getUserTransportBill: getUserTransportBill })
}

export const countBills = async (req, res, next) => {
    let BillCount;
    try {

        BillCount = await Bill.find().estimatedDocumentCount();

    } catch (error) {
        return next(error);
    }

    if (!BillCount) {
        success = false;
        return res.status(400).json({ success, message: "no Bill found" })
    }
    success = true
    res.status(200).json({ success, message: "here is your Bill count", BillCount: BillCount })
}

export const getTransportBillFName = async (req, res, next) => {

    //extracting admin token and checking admin is valid or not
    let { booker } = req.body;

    let getUserTransportBill;
    try {
        getUserTransportBill = await TransportBill.find({ booker: booker });
    } catch (error) {
        return next(error);
    }

    if (!getUserTransportBill) {
        success = false;
        return res.status(400).json({ success, message: "no getUserTransportBill are here" })
    }
    const filteredTransport = getUserTransportBill.filter((transport) =>
        transport.name.toLowerCase().includes(name.toLowerCase())
    );
    success = true;
    return res.status(200).json({ success, message: "here are your all getUserTransportBill", filteredTransport: filteredTransport })
}

export const getHotelBillFUser = async (req, res, next) => {
    let { booker } = req.body;

    let UserHotelBill;
    try {
        UserHotelBill = await RoomBill.find({ booker: booker });
    } catch (error) {
        return next(error);
    }

    if (!UserHotelBill) {
        success = false;
        return res.status(400).json({ success, message: "no UserHotelBill are here" })
    }
    const filteredHotel = UserHotelBill.filter((hotel) =>
        hotel.name.toLowerCase().includes(name.toLowerCase())
    );
    success = true;
    return res.status(200).json({ success, message: "here are your all UserHotelBill", filteredHotel: filteredHotel })
}
export const getTourBillFUser = async (req, res, next) => {
    let { booker } = req.body;
    let getUserTourBill;
    try {
        getUserTourBill = await Bill.find({ booker: booker });
    } catch (error) {
        return next(error);
    }

    if (!getUserTourBill) {
        success = false;
        return res.status(400).json({ success, message: "no getUserTourBill are here" })
    }
    const filteredTour = getUserTourBill.filter((tour) =>
        tour.name.toLowerCase().includes(name.toLowerCase())
    );
    success = true;
    return res.status(200).json({ success, message: "here are your all getUserTourBill", filteredTour: filteredTour })
}