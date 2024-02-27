import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let UserFavrt = new Schema({
    proId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    category: {
        type: String,
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
    description: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    buyer: {
        type: String,
        required: true
    },
    pics: [{
        type: String,
        required: true
    }],
    sizes: [{
        type: String,
        required: true
    }],
    available: {
        type: Boolean,
    }
});
export default mongoose.model('UserFavrt', UserFavrt);