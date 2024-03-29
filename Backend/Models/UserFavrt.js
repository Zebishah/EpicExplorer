import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let UserFavrt = new Schema({
    tourId: {
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
    description: {
        type: String,
        required: true
    },
    days: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    available: {
        type: String,
        required: true
    }
});
export default mongoose.model('UserFavrt', UserFavrt);