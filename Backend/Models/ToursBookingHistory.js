import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let TourBookingHistory_Schema = new Schema({
    tourId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    bookingDate: {
        type: Date,
        default: Date.now
    },
    bookerName: {
        type: String,
        required: true
    },
    bookerEmail: {
        type: String,
        required: true
    },
    checkOutDate: {
        type: String,
        required: true
    }
});
export default mongoose.model('TourBookingHistory', TourBookingHistory_Schema);