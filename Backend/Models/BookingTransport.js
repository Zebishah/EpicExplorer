import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let bookingTourSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    startDate: {
        type: Number,
        required: true
    },
    endDate: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    departureTime: {
        type: String,
        required: true
    },
    Departure_ReturnLocation: {
        type: String,
        required: true
    },
    gallery: [{
        type: String,
        required: true
    }],
    priceIncludes: [{
        type: String,
        required: true
    }],
    priceExcludes: [{
        type: String,
        required: true
    }],
    activities: [{
        type: String,
        required: true
    }],
    available: {
        type: String,
        required: true
    }

});
export default mongoose.model('BookingTour', bookingTourSchema);