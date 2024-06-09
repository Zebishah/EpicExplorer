import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let TransportBookingHistory_Schema = new Schema({
    transportId: {
        type: String,
        required: true
    },
    carName: {
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
    bookersName: {
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
export default mongoose.model('TransportBookingHistory', TransportBookingHistory_Schema);