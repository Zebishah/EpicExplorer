import dotenv from 'dotenv';
import express, { response } from 'express';
import Tour from '../Models/Tour.js';
import Categorie from '../Models/Categorie.js';
import ItrenaryServicesTour from '../Models/ItrenaryServicesTour.js';
import BookingTour from '../Models/BookingTour.js';
import makingTourBill from '../Models/makingTourBill.js';
import NotificationsAdmin from '../Models/NotificationsAdmin.js';
import NotificationsUser from '../Models/NotificationsUser.js';
import notifyUsers from '../Utils/NotifyUser.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import io from '../index.js';
import BookTour from '../Models/BookTour.js';
import mongoose from 'mongoose';

const app = express();
const server = createServer(app);


dotenv.config();

let success = null;

export const addTour = async (req, res, next) => {

    let { name, price, startDate, endDate, parentCategory, description, image, type, departureTime, Departure_ReturnLocation, gallery, bookers, reviews, available, bookings, Collection, bookedCount, membersLimit, tourLocation, ReviewsGiven } = req.body;
    let existingTour;
    try {
        existingTour = await Tour.findOne({ name: name });

    } catch (error) {
        return next(error);
    }
    if (existingTour) {
        success = false;
        return res.status(400).json({ success, message: "Tour already existed ", statusCode: 400 });
    }
    let tour;
    try {
        tour = new Tour({ name, price, startDate, endDate, parentCategory, description, image, type, departureTime, Departure_ReturnLocation, gallery, bookers, reviews, available, bookings, bookedCount, membersLimit, tourLocation, ReviewsGiven, Collection });
        tour = await tour.save();
    } catch (error) {
        return next(error);
    }

    let category;
    try {
        category = await Categorie.findOne({ name: parentCategory });

        category.items.push(tour.id);
        category.save();
    } catch (error) {
        return next(error);
    }
    if (!category) {
        return res.status(400).json({ success: false, message: "category not found", statusCode: 400 });
    }
    let date = new Date();

    let notificationAdmin = new NotificationsAdmin({ accommodationName: "Tour Added Successfully", Category: "Tour Added", message: `One Tour ${name} is added to our site`, date });
    await notificationAdmin.save();

    let data = {
        type: 'Tour Added',
        message: `${name} Tour is Added Successfully`,
        date: date,
        title: "Tour Added Successfully"

    };

    io.emit('notification', data, (err) => { // Add error handling
        if (err) {
            console.error('Error emitting notification:', err);
        } else {
            console.log('Notification emitted successfully!');
        }
    });
    let notificationUser = new NotificationsUser({ user: "no", broadCast: "yes", accommodationName: "Tour Added Successfully", Category: "Tour Added", message: `One Tour ${name} is added to our site`, });
    await notificationUser.save();
    return res.status(200).json({ success: true, message: "New Tour is created", tour: tour, statusCode: 200 });


};
export const getTours = async (req, res, next) => {

    let tours;
    try {
        tours = await Tour.find({ available: "yes" });
    } catch (error) {
        return next(error);
    }

    if (!tours) {
        success = false;
        return res.status(400).json({ success, message: "no tours found in database" })
    }

    return res.status(200).json({ success: true, message: "here are your all tours", tours: tours })
}

export const deleteTour = async (req, res, next) => {
    let id = req.params.id;

    try {
        let tour = await Tour.findByIdAndDelete(id);

        if (!tour) {
            return res.status(400).json({ success: false, message: "Tour not found for deletion" });
        }

        let date = new Date();

        let notificationAdmin = new NotificationsAdmin({ accommodationName: "Tour deleted Successfully", Category: "Tour deleted", message: `One Tour ${tour.name} is deleted from our site`, date });
        await notificationAdmin.save();

        let data = {
            type: 'Tour deleted',
            message: `${tour.name} Tour is deleted Successfully`,
            date: date,
            title: "Tour deleted Successfully"

        };

        notifyUsers(data);
        let notificationUser = new NotificationsUser({ user: "no", broadCast: "yes", accommodationName: "Tour deleted Successfully", Category: "Tour deleted", message: `One Tour ${tour.name} is deleted to our site`, });
        await notificationUser.save();

        return res.status(200).json({ success: true, message: "Tour deleted successfully", deletedTour: tour });
    } catch (error) {
        console.error('Error deleting tour:', error);
        return res.status(500).json({ success: false, message: "Error deleting tour", error: error.message });
    }
};


export const updateTour = async (req, res, next) => {
    let id = req.params.id;
    const { name, price, startDate, endDate, description, newImage, available, image, departureTime, Departure_ReturnLocation, type } = req.body;

    let tour;
    try {
        tour = await Tour.findById(id);
    } catch (error) {
        return next(error);
    }

    if (!tour) {
        return res.status(400).json({ success: false, message: "Tour not existed" });
    }

    // Update tour information
    tour.name = name || tour.name;
    tour.price = price || tour.price;
    tour.startDate = startDate || tour.startDate;
    tour.endDate = endDate || tour.endDate;
    tour.description = description || tour.description;
    tour.available = available || tour.available;
    tour.image = image || tour.image;
    tour.departureTime = departureTime || tour.departureTime;
    tour.Departure_ReturnLocation = Departure_ReturnLocation || tour.Departure_ReturnLocation;
    tour.type = type || tour.type;
    if (newImage) {
        tour.gallery.push(newImage);
    }
    await tour.save();
    let date = new Date();

    let notificationAdmin = new NotificationsAdmin({ accommodationName: "Tour updated Successfully", Category: "Tour updated", message: `One Tour ${tour.name} is updated in our site`, date });
    await notificationAdmin.save();


    return res.status(200).json({ success: true, message: 'Tour updated successfully', tour: tour });


}
export const filterTours = async (req, res, next) => {

    let { type, price, membersLimit, tourLocation, name } = req.body;

    const queryObj = {};
    console.log(name)
    if (name) {
        queryObj.name = { $regex: new RegExp(`^${name}`, 'i') };
    }
    // Handle the type filter
    if (type && type.length > 0) {
        queryObj.type = { $in: type };
    }

    // Handle the membersLimit filter
    if (membersLimit && membersLimit.length > 0) {
        queryObj.membersLimit = { $in: membersLimit };
    }

    // Handle the tourLocation filter
    if (tourLocation && tourLocation.length > 0) {
        queryObj.tourLocation = { $in: tourLocation };
    }
    // Handle the price filter
    if (price.length > 0) {
        if (Array.isArray(price)) {
            const priceRanges = price.map(range => {
                const [minPrice, maxPrice] = range.split('-').map(Number);
                return { price: { $gte: minPrice, $lte: maxPrice } };
            });
            queryObj.$or = priceRanges;
        } else {
            const [minPrice, maxPrice] = price.split('-').map(Number);
            queryObj.price = { $gte: minPrice, $lte: maxPrice };
        }
    }

    console.log(queryObj);

    // Fetch tours based on the combined query object
    let filteredTours;
    try {
        filteredTours = await Tour.find(queryObj);
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error fetching tours", error });
    }

    if (!filteredTours || filteredTours.length === 0) {
        return res.status(404).json({ success: false, message: "No tours found with the given filter" });
    }
    return res.status(200).json({ success: true, tours: filteredTours });
};
export const countTours = async (req, res, next) => {
    let toursCount;
    try {

        toursCount = await Tour.find().estimatedDocumentCount();

    } catch (error) {
        return next(error);
    }

    if (!toursCount) {
        success = false;
        return res.status(400).json({ success, message: "no tours found" })
    }
    success = true
    res.status(200).json({ success, message: "here is your tour count", toursCount: toursCount })
}

export const perPageTours = async (req, res, next) => {


    let page = req.body.page ? req.body.page : 1;
    let perPage = 3;

    if (page) {
        let existingTour;
        try {
            existingTour = await Tour.find({}).skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 });


        } catch (error) {
            return res.status(400).json({ success, message: "cant do pagination" });
        }
        success = true;
        return res.status(200).json({ success, existingTour });


    }
}

export const openTour = async (req, res, next) => {
    let { id } = req.params;

    id = id.toString();


    let tour;
    try {
        tour = await Tour.findById(id);
    } catch (error) {
        return next(error);
    }

    if (!tour) {
        success = false;
        return res.status(400).json({ success, message: "Tour not existed that u are trying to open" });
    }

    let tourServiceIt;
    try {
        tourServiceIt = await ItrenaryServicesTour.findOne({ tourId: id });
    } catch (error) {
        return next(error);
    }

    if (!tourServiceIt) {
        success = false;
        return res.status(400).json({ success, message: "Tour services not existed that u are trying to open" });
    }


    return res.status(200).json({ success: true, tour: tour, tourServiceIt: tourServiceIt });

}

export const getFormData = async (req, res, next) => {

    let id = req.params.id;
    let { travelers, bookerName, bookerEmail, bookerPhone, bookerAddress, suggestion, members, pickupLocation } = req.body;
    let user = await req.user;
    console.log(user)
    let tour;
    try {
        tour = await Tour.findById(id);
    } catch (error) {
        return next(error);
    }

    if (!tour) {
        success = false;
        return res.status(400).json({ success, message: "Tour not existed that u are trying to open" });
    }
    let date = new Date();
    let tourBookingCheck;
    try {
        tourBookingCheck = await BookingTour.findOne({ tourId: id, bookerEmail: user.email })
    } catch (error) {
        return next(error);
    }

    if (tourBookingCheck) {

        return res.status(400).json({ success, message: "Tour already existed in booking database" });
    }
    let tourBooking;
    tour.price = tour.price * members;
    try {
        // tourNo = tourNo + 1;
        tourBooking = new BookingTour({ tourId: tour.id, name: tour.name, image: tour.image, price: tour.price, startDate: tour.startDate, endDate: tour.endDate, checkInDate: date, travelers, bookerName, bookerEmail, bookerPhone, bookerAddress, suggestion, bookerId: user.id, members, pickupLocation });
        tourBooking = await tourBooking.save();

    } catch (error) {
        return next(error);
    }
    let bill, deliveryCharges = "free";

    try {

        bill = new makingTourBill({ booking: tourBooking.id, bookerId: user.id, booker: bookerName, deliveryCharges: deliveryCharges, totalPrice: tour.price, tourName: tour.name, date });
        bill = await bill.save();

    } catch (error) {
        return next(error);
    }

    return res.status(200).json({ success: true, message: "New Tour booking start do payment", bill: bill, tourBooking: tourBooking });


};

export const searchTourByName = async (req, res, next) => {
    let { name } = req.body;
    let tours;
    try {
        tours = await Tour.find({ name: name });
    } catch (error) {
        return next(error);
    }
    console.log(tours)
    if (tours == "") {

        return res.status(400).json({ success: false, message: "no tours found in database" })
    }

    const filteredTours = tours.filter((tour) =>  //filtering searched tour information
        tour.name.toLowerCase().includes(name.toLowerCase())
    );

    return res.status(200).json({ success: true, message: "here are your all tours", filteredTours: filteredTours })
}


export const searchTourById = async (req, res, next) => {

    let id = req.body.id;

    let tours;
    try {
        tours = await BookTour.find({ tourId: id });

    } catch (error) {
        return next(error);
    }

    if (!tours) {

        return res.status(400).json({ success: false, message: "no tours found in database" })
    }

    return res.status(200).json({ success: true, message: "here are your all tours", tours: tours })
}

export const tourPackages = async (req, res, next) => {

    let tours;
    try {
        tours = await Tour.find({ parentCategory: "6672a0d8e8cc4b2b8b3bf63e" });

    } catch (error) {
        return next(error);
    }

    if (!tours) {

        return res.status(400).json({ success: false, message: "no tours found in database" })
    }
    const honeymoonTours = tours.filter(tour => tour.type === "Honeymoon");
    const familyTours = tours.filter(tour => tour.type === "Family");
    const personalTours = tours.filter(tour => tour.type === "Personal");


    return res.status(200).json({ success: true, message: "here are your all tours", honeymoonTours: honeymoonTours, familyTours: familyTours, personalTours: personalTours, tours: tours })
}

export const DiscountedTours = async (req, res, next) => {

    let tours;
    try {
        tours = await Tour.find({ parentCategory: "6672a109e8cc4b2b8b3bf644" });

    } catch (error) {
        return next(error);
    }

    if (!tours) {

        return res.status(400).json({ success: false, message: "no tours found in database" })
    }


    return res.status(200).json({ success: true, message: "here are your all tours", tours: tours })
}

export const AllTourPackages = async (req, res, next) => {

    let tours;
    try {
        tours = await Tour.find({ parentCategory: "6672a0d8e8cc4b2b8b3bf63e" });

    } catch (error) {
        return next(error);
    }

    if (!tours) {

        return res.status(400).json({ success: false, message: "no tours found in database" })
    }


    return res.status(200).json({ success: true, message: "here are your all tours", tours: tours })
}

export const AllLatestTours = async (req, res, next) => {

    let tours;
    try {
        tours = await Tour.find({ parentCategory: "6672a0a4e8cc4b2b8b3bf63b" });

    } catch (error) {
        return next(error);
    }

    if (!tours) {

        return res.status(400).json({ success: false, message: "no tours found in database" })
    }


    return res.status(200).json({ success: true, message: "here are your all tours", tours: tours })
}

export const relatedTours = async (req, res, next) => {
    let id = req.body.id;
    let tours;
    try {
        tours = await Tour.findById(id);

    } catch (error) {
        return next(error);
    }

    if (!tours) {

        return res.status(400).json({ success: false, message: "no tours found in database" })
    }
    let finalTour = await Tour.find({ type: tours.type });

    return res.status(200).json({ success: true, message: "here are your all tours", tours: finalTour })
}