import dotenv from 'dotenv';
import express, { response } from 'express';
import Bill from '../Models/Bill.js';
import TransportBill from '../Models/TransportBill.js';
import RoomBill from '../Models/RoomBill.js';
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
    let user = await req.user;

    let UserHotelBill;
    try {
        UserHotelBill = await RoomBill.find({ bookerId: user.id });
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
    let user = await req.user;
    let getUserTourBill;

    try {
        getUserTourBill = await Bill.find({ bookerId: user.id });
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
    console.log("getUserTransportBill")
    //extracting admin token and checking admin is valid or not
    let user = await req.user;

    let getUserTransportBill;
    try {
        getUserTransportBill = await TransportBill.find({ bookerId: user.id });
    } catch (error) {
        return next(error);
    }

    if (!getUserTransportBill) {
        success = false;
        return res.status(400).json({ success, message: "no getUserTransportBill are here" })
    }

    success = true;
    console.log(getUserTransportBill)
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

export const getTransportBillFUserId = async (req, res, next) => {

    //extracting admin token and checking admin is valid or not
    let id = req.body.id;

    let getUserTransportBill;
    try {
        getUserTransportBill = await TransportBill.find({ booking: id });
    } catch (error) {
        return next(error);
    }

    if (!getUserTransportBill) {

        return res.status(400).json({ success: false, message: "no getUserTransportBill are here" })
    }


    return res.status(200).json({ success: true, message: "here are your all TransportBill", Transport: getUserTransportBill })
}

export const getHotelBillFUserId = async (req, res, next) => {
    let id = req.body.id;

    let UserHotelBill;
    try {
        UserHotelBill = await RoomBill.find({ booking: id });
    } catch (error) {
        return next(error);
    }

    if (!UserHotelBill) {

        return res.status(400).json({ success: false, message: "no UserHotelBill are here" })
    }


    return res.status(200).json({ success: true, message: "here are your all HotelBill", Hotel: UserHotelBill })
}
export const getTourBillFUserId = async (req, res, next) => {
    let id = req.body.id;
    let getUserTourBill;
    try {
        getUserTourBill = await Bill.find({ booking: id });
    } catch (error) {
        return next(error);
    }

    if (!getUserTourBill) {

        return res.status(400).json({ success: false, message: "no getUserTourBill are here" })
    }


    return res.status(200).json({ success: true, message: "here are your all TourBill", Tour: getUserTourBill })
}