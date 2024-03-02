import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let bookedTour_Schema = new Schema({
    carName: {
        type: String,
        required: true
    },
    prices: {
        type: Number,
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    description: {
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
    bookerId: {
        type: String,
        required: true
    },
    days: {
        type: String,
        required: true
    },
    buyDate: {
        type: Date,
        default: Date.now, // Set the default value to the current date and time
    },



});
export default mongoose.model('BookProduct', bookedTour_Schema);