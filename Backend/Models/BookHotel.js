import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let bookedTour_Schema = new Schema({
    hotelId: {
        type: String,
        required: true
    },
    roomName: {
        type: String,
        required: true
    },
    roomPrice: {
        type: Number,
        required: true
    },
    roomType: {
        type: String,
        required: true
    },
    checkoutDate: {
        type: String,
        required: true
    },
    checkInDate: {
        type: Date,
        default: Date.now,
    },
    days: {
        type: String,
        required: true
    },
    guests: [{
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




});
export default mongoose.model('BookProduct', bookedTour_Schema);