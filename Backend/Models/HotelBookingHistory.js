import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let HotelBookingHistory_Schema = new Schema({
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
    bookerId: {
        type: String,
        required: true
    },
    members: {
        type: String,
        required: true
    },

});
export default mongoose.model('HotelBookingHistory', HotelBookingHistory_Schema);