import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let billSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    totalDiscount: {
        type: Number,
        required: true
    },
    deliveryCharges: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    finalPrice: {
        type: Number,
        required: true
    },

})
export default mongoose.model('Bill', billSchema);