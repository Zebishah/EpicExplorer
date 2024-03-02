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
    price: {
        type: Number,
        required: true
    },
    checkInDate: {
        type: String,
        required: true
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
    bookerId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    members: {
        type: String,
        required: true
    },

});
export default mongoose.model('TourBookingHistory', TourBookingHistory_Schema);