import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let billSchema = new Schema({
    bookerId: {
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
    }, bookedThing: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    }

})
export default mongoose.model('Bill', billSchema);