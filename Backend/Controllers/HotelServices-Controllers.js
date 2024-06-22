import dotenv from 'dotenv';
import ItServicesHotel from '../Models/ItServicesHotel.js';
import NotificationsAdmin from '../Models/NotificationsAdmin.js';
import notifyUsers from '../Utils/NotifyUser.js';
dotenv.config();

let success = null;

export const addHotelServices = async (req, res, next) => {

    let { roomId, priceIncludes, priceExcludes, services, completeInfo } = req.body;

    let checkServicesIT;
    try {
        checkServicesIT = await ItServicesHotel.findOne({ roomId: roomId });

    } catch (error) {
        return next(error);
    }
    if (checkServicesIT) {
        return res.status(400).json({ success: false, message: "Hotel Services and itrenary is already here" });
    }


    let servicesIT;
    try {
        servicesIT = new ItServicesHotel({ roomId, priceIncludes, priceExcludes, services, completeInfo });
        await servicesIT.save();
    } catch (error) {
        return next(error);
    }
    if (!servicesIT) {
        return res.status(400).json({ success: false, message: "Hotel Services and itrenary is not created" });
    }
    let date = new Date();
    let notificationAdmin = new NotificationsAdmin({ accommodationName: "Hotel Service added Successfully", Category: "Hotel-Service Added", message: `New Hotel Service is added to our website is added to our site`, date });
    await notificationAdmin.save();
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

        return res.status(400).json({ success: false, message: "no ServicesItrenary found in database" })
    }

    return res.status(200).json({ success: true, message: "here are your all ServicesIteranries of Hotels", ServicesIt: ServicesIt })
}
