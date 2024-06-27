
import NotificationsAdmin from "../Models/NotificationsAdmin.js";
import NotificationsUser from "../Models/NotificationsUser.js";
import Review from "../Models/Review.js";
import Room from "../Models/Room.js";
import notifyUsers from '../Utils/NotifyUser.js';
import Tour from "../Models/Tour.js";
import Transport from "../Models/Transport.js";
import HotelReviews from "../Models/HotelReviews.js";
import TransportReviews from "../Models/TransportReviews.js";
let reviewNo = 0;
export const addReviews = async (req, res, next) => {
    let user = await req.user;

    let { id, name, email, words, rating } = req.body;
    let existingReview = null;
    let tourCheck;
    try {
        tourCheck = await Tour.findById(id); //finding tour 

    } catch (error) {
        return next(error);
    }
    if (tourCheck) {

        try {
            existingReview = new Review({ name, email, reviewedService: tourCheck.name, image: user.pic, words, rating });
            existingReview = await existingReview.save();
            tourCheck.reviews.push(existingReview.id);
            console.log(existingReview);
        } catch (error) {
            return next(error);
        }
        if (!existingReview) {

            return res.status(400).json({ success: false, message: "Please give valid Review...." });
        }

    }

    let roomCheck;
    try {
        roomCheck = await Room.findById(id);


    } catch (error) {
        return next(error);
    }
    if (roomCheck) {

        try {
            existingReview = new HotelReviews({ name, email, reviewedService: roomCheck.name, image: user.pic, words, rating });
            existingReview = await existingReview.save();
            roomCheck.reviews.push(existingReview.id)
        } catch (error) {
            return next(error);
        }
        if (!existingReview) {

            return res.status(400).json({ success: false, message: "Please give valid Review...." });
        }

    }

    let transportCheck;
    try {
        transportCheck = await Transport.findById(id);
    } catch (error) {
        return next(error);
    }
    if (transportCheck) {

        try {
            existingReview = new TransportReviews({ name, email, reviewedService: transportCheck.carName, image: user.pic, words, rating });
            existingReview = await existingReview.save();
            transportCheck.reviews.push(existingReview.id)
        } catch (error) {
            return next(error);
        }
        if (!existingReview) {

            return res.status(400).json({ success: false, message: "Please give valid Review...." });
        }

    }

    //then we are adding review into its category wether its of tour,transport or of hotel we are adding it into its category 

    if ((!tourCheck) && (!transportCheck) && (!roomCheck)) {
        return res.status(400).json({ success: false, message: "Did'nt added review in accommodations " });
    }
    let date = new Date();

    let notificationAdmin = new NotificationsAdmin({ accommodationName: "Review received Successfully", Category: "Review received", message: `we received one review from ${name}`, date });
    await notificationAdmin.save();

    let data = {
        type: 'Review Added',
        message: `${name} your review is submitted Successfully`,
        date: date,
        title: "review Added Successfully"

    };

    notifyUsers(data);
    let notificationUser = new NotificationsUser({ user: user.userName, broadCast: "no", accommodationName: "review Added Successfully", Category: "Review Added", message: `${name} your review is submitted Successfully` });
    await notificationUser.save();
    return res.status(200).json({ success: true, message: "New review is created", existingReview: existingReview });


};

export const getReviews = async (req, res, next) => {
    console.log("getReviews")
    let getReview, getHotelReviews, getTransportReviews;
    try {
        getReview = await Review.find();
    } catch (error) {
        return next(error);
    }
    if (!getReview) {
        success = false;
        return res.status(400).json({ success, message: "Did'nt get Reviews...." });
    }
    try {
        getHotelReviews = await HotelReviews.find();
    } catch (error) {
        return next(error);
    }
    if (!getHotelReviews) {
        success = false;
        return res.status(400).json({ success, message: "Did'nt get Reviews...." });
    }
    try {
        getTransportReviews = await TransportReviews.find();
    } catch (error) {
        return next(error);
    }
    if (!getTransportReviews) {
        success = false;
        return res.status(400).json({ success, message: "Did'nt get Reviews...." });
    }
    const allReviews = [...getReview, ...getHotelReviews, ...getTransportReviews];
    return res.status(200).json({ success: true, message: "New review is created", allReviews: allReviews });


};
export const getUserReviews = async (req, res, next) => {
    let user = await req.user;
    let getReview;
    try {
        getReview = await Review.find({ email: user.email });
    } catch (error) {
        return next(error);
    }
    if (!getReview) {
        success = false;
        return res.status(400).json({ success, message: "Did'nt get Reviews...." });
    }

    return res.status(200).json({ success: true, message: "New review is created", getReview: getReview });


};
export const getTourReviews = async (req, res, next) => {
    let id = req.body.id;
    let tour;
    try {
        tour = await Tour.findById(id);
    } catch (error) {
        return next(error);
    }
    if (!tour) {
        success = false;
        return res.status(400).json({ success, message: "Did'nt get tour...." });
    }

    let getReview;
    try {
        getReview = await Review.find({ reviewedService: tour.name });
    } catch (error) {
        return next(error);
    }
    if (!getReview) {
        success = false;
        return res.status(400).json({ success, message: "Did'nt get Reviews...." });
    }

    return res.status(200).json({ success: true, message: "Your reviews are here", getReview: getReview });


};
export const getHotelReviews = async (req, res, next) => {
    let id = req.params.id;
    let getReview;
    try {
        getReview = await HotelReviews.find({ reviewedService: tour.name });
    } catch (error) {
        return next(error);
    }
    if (!getReview) {
        success = false;
        return res.status(400).json({ success, message: "Did'nt get Reviews...." });
    }

    return res.status(200).json({ success: true, message: "Your reviews are here", getReview: getReview });


};
export const getTransportReviews = async (req, res, next) => {
    let id = req.params.id;
    let getReview;
    try {
        getReview = await TransportReviews.find({ reviewedService: tour.name });
    } catch (error) {
        return next(error);
    }
    if (!getReview) {
        success = false;
        return res.status(400).json({ success, message: "Did'nt get Reviews...." });
    }

    return res.status(200).json({ success: true, message: "Your reviews are here", getReview: getReview });


};
export const getUserTourReviews = async (req, res, next) => {
    let user = await req.user;
    let id = req.params.id;
    let getReview;
    try {
        getReview = await Review.find({ reviewedService: id, email: user.email });
    } catch (error) {
        return next(error);
    }
    if (!getReview) {
        success = false;
        return res.status(400).json({ success, message: "Did'nt get Reviews...." });
    }
    return res.status(200).json({ success: true, message: "Your reviews are here", getReview: getReview });
};
export const getUserTransportReviews = async (req, res, next) => {
    let user = await req.user;
    let id = req.params.id;
    let getReview;
    try {
        getReview = await TransportReviews.find({ reviewedService: id, email: user.email });
    } catch (error) {
        return next(error);
    }
    if (!getReview) {
        success = false;
        return res.status(400).json({ success, message: "Did'nt get Reviews...." });
    }
    return res.status(200).json({ success: true, message: "Your reviews are here", getReview: getReview });
};
export const getUserHotelReviews = async (req, res, next) => {
    let user = await req.user;
    let id = req.params.id;
    let getReview;
    try {
        getReview = await HotelReviews.find({ reviewedService: id, email: user.email });
    } catch (error) {
        return next(error);
    }
    if (!getReview) {
        success = false;
        return res.status(400).json({ success, message: "Did'nt get Reviews...." });
    }
    return res.status(200).json({ success: true, message: "Your reviews are here", getReview: getReview });
};
export const countReviews = async (req, res, next) => {
    let ReviewCount;
    try {

        ReviewCount = await Review.find().estimatedDocumentCount(); //counting reviews

    } catch (error) {
        return next(error);
    }

    if (!ReviewCount) {
        success = false;
        return res.status(400).json({ success, message: "no Review found" })
    }
    success = true
    res.status(200).json({ success, message: "here is your Review count", ReviewCount: ReviewCount })
}