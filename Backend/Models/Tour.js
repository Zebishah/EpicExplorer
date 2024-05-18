import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let tourSchema = new Schema({
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
    parentCategory: {
        type: String,
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

    bookers: [{
        type: mongoose.Types.ObjectId,
        ref: "User",

    }],

    bookings: [{
        type: Date,
        default: Date.now

    }],
    reviews: [{
        type: mongoose.Types.ObjectId,
        ref: "Review",
    }],
    available: {
        type: String,
        required: true
    },
    bookedCount: {
        type: String,
        required: true
    }
});
export default mongoose.model('Tour', tourSchema);