import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let RoomSchema = new Schema({

    hotelId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    prices: {
        type: Number,
        required: true
    },
    type: {
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
    gallery: [{
        type: String,
        required: true
    }],
    features: [{
        type: String,
        required: true
    }],
    location: {
        type: String,
        required: true
    },
    reviews: [{
        type: mongoose.Types.ObjectId,
        ref: "Review",

    }], bookers: [{
        type: mongoose.Types.ObjectId,
        ref: "User",

    }],
    noOfGuests: {
        type: String,
        required: true

    },
    available: {
        type: String,
        required: true
    },
    bookedCount: {
        type: String,
        required: true
    },
    bookings: [{

        type: String,
        required: true
    }],
});
export default mongoose.model('Room', RoomSchema);