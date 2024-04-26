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
    image: {
        type: String,
        required: true
    },
    checkoutDate: {
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
    bookerId: {
        type: String,
        required: true
    },

});
export default mongoose.model('HotelBookingHistory', HotelBookingHistory_Schema);