import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let TransportSchema = new Schema({

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
    type: {
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
    gallery: [{
        type: String,
        required: true
    }],
    features: [{
        type: String,
        required: true
    }],
    allowedGuests: {
        type: String,
        required: true
    },
    reviews: [{
        type: mongoose.Types.ObjectId,
        ref: "Review",

    }],
    available: {
        type: String,
        required: true
    },
    bookedCount: {
        type: Number,

    }, bookers: [{
        type: mongoose.Types.ObjectId,
        ref: "User",

    }],

    bookings: [{
        type: Date,
        default: Date.now

    }],

});
export default mongoose.model('Transport', TransportSchema);