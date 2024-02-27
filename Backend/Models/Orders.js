import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let order_Schema = new Schema({
    orderNo: {
        type: Number,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userPhone: {
        type: Number,
        required: true
    },
    userAddress: {
        type: String,
        required: true
    },
    buyedProducts: [{
        type: String,
        required: true
    }],
    Bill: [{
        type: String,
        required: true
    }],
    buyDate: {
        type: Date,
        default: Date.now, // Set the default value to the current date and time
    },



});
export default mongoose.model('Orders', order_Schema);