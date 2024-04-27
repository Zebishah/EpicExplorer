import Hotels from "../Models/Hotels";
import Review from "../Models/Review";
import Room from "../Models/Room";
import Tour from "../Models/Tour";
import Transport from "../Models/Transport";
let reviewNo = 0;
export const addReviews = async (req, res, next) => {
    let user = await req.user;
    let id = req.params.id; //fetching id from params
    let { name, email, reviewedService, image, words, rating } = req.body;

    let existingReview;
    try {
        existingReview = new Review({ name, email, reviewedService, image, words, rating, reviewedServiceId: id });
        existingReview = existingReview.save();
    } catch (error) {
        return next(error);
    }
    if (!existingReview) {

        return res.status(400).json({ success: false, message: "Please give valid Review...." });
    }
    //then we are adding review into its category wether its of tour,transport or of hotel we are adding it into its category 
    let tour;
    try {
        tour = await Tour.findById(id); //finding tour 

    } catch (error) {
        return next(error);
    }
    if (tour) {
        tour.reviews.push(existingReview);
    }

    let room;
    try {
        room = await Room.findById(id);


    } catch (error) {
        return next(error);
    }
    if (room) {
        room.reviews.push(existingReview)
    }

    let transport;
    try {
        transport = await Transport.findById(id);


    } catch (error) {
        return next(error);
    }
    if (transport) {
        transport.reviews.push(existingReview)
    }
    if ((!tour) && (!transport) && (!room)) {
        return res.status(400).json({ success: false, message: "Did'nt added review in accommodations " });
    }
    return res.status(200).json({ success: true, message: "New review is created", existingReview: existingReview });


};

export const getReviews = async (req, res, next) => {

    let getReview;
    try {
        getReview = await Review.find();
    } catch (error) {
        return next(error);
    }
    if (!getReview) {
        success = false;
        return res.status(400).json({ success, message: "Did'nt get Reviews...." });
    }

    return res.status(200).json({ success: true, message: "New review is created", getReview: getReview });


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
    let user = await req.user;
    let id = req.params.id;
    let getReview;
    try {
        getReview = await Review.find({ reviewedServiceId: id });
    } catch (error) {
        return next(error);
    }
    if (!getReview) {
        success = false;
        return res.status(400).json({ success, message: "Did'nt get Reviews...." });
    }

    return res.status(200).json({ success: true, message: "Your reviews are here", getReview: getReview });


}; export const getUserTourReviews = async (req, res, next) => {
    let user = await req.user;
    let id = req.params.id;
    let getReview;
    try {
        getReview = await Review.find({ reviewedServiceId: id, email: user.email });
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