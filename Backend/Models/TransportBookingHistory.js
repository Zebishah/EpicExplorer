import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let TransportBookingHistory_Schema = new Schema({
    carName: {
        type: String,
        required: true
    },
    prices: {
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
        type: String,
        required: true
    },
    members: {
        type: String,
        required: true
    },

});
export default mongoose.model('TransportBookingHistory', TransportBookingHistory_Schema);