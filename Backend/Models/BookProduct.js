import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let bookedProduct_Schema = new Schema({
    proId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    pics: [{
        type: String,
        required: true
    }],
    size: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    sells: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    discountPrice: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    }, remaining: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }, category: {
        type: String,
        required: true
    },
    buyer: {
        type: mongoose.Types.ObjectId,
        ref: "User",

    },
    buyDate: {
        type: Date,
        default: Date.now, // Set the default value to the current date and time
    },



});
export default mongoose.model('BookProduct', bookedProduct_Schema);