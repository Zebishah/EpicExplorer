import dotenv from 'dotenv';
import express, { response } from 'express';
import Tour from '../Models/Tour.js';
import Categorie from '../Models/Categorie.js';
import ItrenaryServicesTour from '../Models/ItrenaryServicesTour.js';
import BookingTour from '../Models/BookingTour.js';
import makingTourBill from '../Models/makingTourBill.js';
import NotificationsAdmin from '../Models/NotificationsAdmin.js';
import NotificationsUser from '../Models/NotificationsUser.js';
const app = express();
dotenv.config();

let success = null;

export const addTour = async (req, res, next) => {

    let { name, price, startDate, endDate, parentCategory, description, image, type, departureTime, Departure_ReturnLocation, gallery, bookers, reviews, available, bookings, bookedCount } = req.body;
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
        tour = new Tour({ name, price, startDate, endDate, parentCategory, description, image, type, departureTime, Departure_ReturnLocation, gallery, bookers, reviews, available, bookings, bookedCount });
        tour = await tour.save();
    } catch (error) {
        return next(error);
    }

    let category;
    try {
        category = await Categorie.findById(parentCategory);

        category.items.push(tour.id);
        category.save();
    } catch (error) {
        return next(error);
    }
    if(!category)
        {
        return res.status(400).json({ success: false, message: "category not found", statusCode:400});
        }
    let date = new Date();
    let notificationAdmin = new NotificationsAdmin({ accommodationName: name, Category: "new tour added", message: `one tour ${name} is added in our site`, date: date })
    await notificationAdmin.save();
    let notificationUser = new NotificationsUser({ accommodationName: name, Category: "new tour added", message: `new tour ${name} is added `, date: date })
    await notificationUser.save();
    return res.status(200).json({ success: true, message: "New Tour is created", tour: tour, statusCode: 200 });


};
export const getTours = async (req, res, next) => {

    let tours;
    try {
        tours = await Tour.find();
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
        let notificationAdmin = new NotificationsAdmin({ accommodationName: tour.name, Category: "tour deleted", message: `Tour ${tour.name} is deleted from our site`, date: date });
        await notificationAdmin.save();

        let notificationUser = new NotificationsUser({ accommodationName: tour.name, Category: "tour deleted", message: `Tour ${tour.name} is deleted`, date: date });
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
    let notificationAdmin = new NotificationsAdmin({ accommodationName: tour.name, Category: "tour is updated", message: `one tour ${tour.name} information is updated in our site`, date: date })
    await notificationAdmin.save();

    return res.status(200).json({ success: true, message: 'Tour updated successfully', tour: tour });


}
export const filterTours = async (req, res, next) => {


    let { type, price } = req.query;
    const sampleQueryObj = {}, QueryObj = {};


    if (type) {
        type = type.split(',');
        sampleQueryObj.type = type;
    }
    let existingTour;
    if (sampleQueryObj) {

        try {
            existingTour = await Tour.find(sampleQueryObj);

        } catch (error) {
            return console.log(error);
        }
        if (!existingTour) {
            success = false;
            return res.status(400).json({ success, message: "tour not found of filter" });
        }
    }
    console.log(existingTour)
    const typeIds = [];
    if (existingTour) {
        // Array to store category IDs

        existingTour.forEach(tour => {
            typeIds.push(tour._id); // Push each category ID into the array
        });


    }
    if (typeIds) {
        QueryObj._id = typeIds;
    }

    if (price) {
        price.gte = parseInt(price.gte);
        price.lte = parseInt(price.lte);
        QueryObj.price = { $gte: price.gte, $lte: price.lte }
    }
    console.log(QueryObj)
    if (QueryObj) {
        let existingTour;
        try {
            existingTour = await Tour.find(QueryObj);


        } catch (error) {
            return console.log(error);
        }
        success = true;
        return res.status(200).json({ success, existingTour });


    }


}
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


    let page = req.params.page ? req.params.page : 1;
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
    let id = req.params.id;

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

        bill = new makingTourBill({ booking: tourBooking.id, bookerId: user.id, booker: user.name, deliveryCharges: deliveryCharges, totalPrice: tour.price, tourName: tour.name, date });
        bill = await bill.save();

    } catch (error) {
        return next(error);
    }

    return res.status(200).json({ success: true, message: "New Tour booking start do payment", bill: bill, tourBooking: tourBooking });


};

export const searchTour = async (req, res, next) => {
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
