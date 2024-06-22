import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let UserFavrt = new Schema({
    compId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    prices: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    accommodationName: {
        type: String,
        required: true
    },


});
export default mongoose.model('UserFavrt', UserFavrt);