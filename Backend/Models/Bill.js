import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let billSchema = new Schema({

    booking: {
        type: String,
        required: true

    },
    bookerId: {
        type: String,
        required: true

    },
    senderAccountId: {
        type: String,
        required: true
    },
    ReceiverAccountId: {
        type: String,
        required: true
    },
    booker: {
        type: String,
        required: true

    },
    deliveryCharges: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    }, tourName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    }

})
export default mongoose.model('Bill', billSchema);