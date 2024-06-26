import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let HotelBookingHistory_Schema = new Schema({
    hotelId: {
        type: String,
        required: true
    },
    roomId: {
        type: String,
        required: true
    },
    roomName: {
        type: String,
        required: true
    },
    amount: {
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

});
export default mongoose.model('HotelBookingHistory', HotelBookingHistory_Schema);