import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let bookedTour_Schema = new Schema({
    tourId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    checkInDate: {
        type: Date,
        default: Date.now,
    },
    travelers: [{
        type: String,
        required: true
    }],
    bookerName: {
        type: String,
        required: true
    },
    bookerEmail: {
        type: String,
        required: true
    },
    bookerPhone: {
        type: String,
        required: true
    },
    bookerAddress: {
        type: String,
        required: true
    },
    suggestion: {
        type: String,
        required: true
    },
    bookerId: {
        type: mongoose.Types.ObjectId,
        ref: "User",

    },
    members: {
        type: String,
        required: true
    },

    buyDate: {
        type: Date,
        default: Date.now, // Set the default value to the current date and time
    },




});
export default mongoose.model('BookTour', bookedTour_Schema);