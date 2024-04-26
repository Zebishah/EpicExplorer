import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import express, { response } from 'express';
import Admin from '../Models/Admin.js';
import ItrenaryServicesTour from '../Models/ItrenaryServicesTour.js';

const app = express();
dotenv.config();

let success = null;

export const addTourServices = async (req, res, next) => {
    let { tourId, priceIncludes, priceExcludes, activities, daysServices } = req.body;
    let admin = req.admin;

    let servicesIT;
    try {
        servicesIT = new ItrenaryServicesTour({ tourId, priceIncludes, priceExcludes, activities, daysServices });
        servicesIT = await servicesIT.save();
    } catch (error) {
        return next(error);
    }


    return res.status(200).json({ success: true, message: "Tour Services and itrenary is created", servicesIT: servicesIT });


};
export const getTourServicesIT = async (req, res, next) => {

    let ServicesIt;
    try {
        ServicesIt = await ItrenaryServicesTour.find();
    } catch (error) {
        return next(error);
    }

    if (!ServicesIt) {
        success = false;
        return res.status(400).json({ success, message: "no ServicesItrenary found in database" })
    }

    return res.status(200).json({ success: true, message: "here are your all ServicesIteranries of tour", ServicesIt: ServicesIt })
}
