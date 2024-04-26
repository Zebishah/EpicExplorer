import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let bookedTransport_Schema = new Schema({
    bookedTransportNo: {
        type: Number,
        required: true
    },
    transportId: {
        type: String,
        required: true
    },
    carName: {
        type: String,
        required: true
    },
    prices: {
        type: Number,
        required: true
    }, image: {
        type: String,
        required: true
    },
    seats: {
        type: Number,
        required: true
    },

    checkInDate: {
        type: Date,
        default: Date.now,
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
    bookerPhone: {
        type: String,
        required: true
    },
    bookerAddress: {
        type: String,
        required: true
    },
    suggestion: {
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
    days: {
        type: String,
        required: true
    },
    BooksCount: {
        type: Number,
        required: true
    }



});
export default mongoose.model('BookTransport', bookedTransport_Schema);