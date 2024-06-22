import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import express, { response } from 'express';
import Admin from '../Models/Admin.js';
import ItrenaryServicesTour from '../Models/ItrenaryServicesTour.js';
import notifyUsers from '../Utils/NotifyUser.js';
import NotificationsAdmin from '../Models/NotificationsAdmin.js';
const app = express();
dotenv.config();

let success = null;

export const addTourServices = async (req, res, next) => {
    let { tourId, priceIncludes, priceExcludes, services, daysServices } = req.body;
    let servicesIT;
    try {
        servicesIT = await ItrenaryServicesTour.findOne({ tourId: tourId });

    } catch (error) {
        return next(error)
    }
    if (servicesIT) {
        return res.status(400).json({ success: false, message: "ServicesItrenary related to this tour is already present" })
    }
    try {
        servicesIT = new ItrenaryServicesTour({ tourId, priceIncludes, priceExcludes, activities: services, daysServices });
        servicesIT = await servicesIT.save();
    } catch (error) {
        return next(error);
    }
    let date = new Date();
    let notificationAdmin = new NotificationsAdmin({ accommodationName: "Tour Service added Successfully", Category: "Tour-Service Added", message: `New Tour Service is added to our website is added to our site`, date });
    await notificationAdmin.save();
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

        return res.status(400).json({ success: false, message: "no ServicesItrenary found in database" })
    }

    return res.status(200).json({ success: true, message: "here are your all ServicesIteranries of tour", ServicesIt: ServicesIt })
}
