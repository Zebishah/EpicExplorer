import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import express, { response } from 'express';
import Admin from '../Models/Admin.js';
import ItServicesHotel from '../Models/ItServicesHotel.js';
const app = express();
dotenv.config();

let success = null;

export const addHotelServices = async (req, res, next) => {

    let { roomId, priceIncludes, priceExcludes, services, completeInfo } = req.body;

    let checkServicesIT;
    try {
        checkServicesIT = await ItServicesHotel.findOne({ roomId: roomId });
        checkServicesIT = await checkServicesIT.save();
    } catch (error) {
        return next(error);
    }
    if (checkServicesIT) {
        return res.status(400).json({ success: false, message: "Hotel Services and itrenary is already here" });
    }


    let servicesIT;
    try {
        servicesIT = new ItServicesHotel({ roomId, priceIncludes, priceExcludes, services, completeInfo });
        servicesIT = await servicesIT.save();
    } catch (error) {
        return next(error);
    }
    if (!servicesIT) {
        return res.status(400).json({ success: false, message: "Hotel Services and itrenary is not created" });
    }
    return res.status(200).json({ success: true, message: "Hotel Services and itrenary is created", servicesIT: servicesIT });


};
export const getHotelServicesIT = async (req, res, next) => {

    let ServicesIt;
    try {
        ServicesIt = await ItServicesHotel.find();
    } catch (error) {
        return next(error);
    }

    if (!ServicesIt) {
        success = false;
        return res.status(400).json({ success, message: "no ServicesItrenary found in database" })
    }

    return res.status(200).json({ success: true, message: "here are your all ServicesIteranries of Hotels", ServicesIt: ServicesIt })
}
