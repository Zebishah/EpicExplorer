import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let HotelReviewSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    reviewedService: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },
    words: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,

    }
});
export default mongoose.model('HotelReview', HotelReviewSchema);