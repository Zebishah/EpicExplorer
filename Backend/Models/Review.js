import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let ReviewSchema = new Schema({
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
    words: [{
        type: String,
        required: true
    }],

});
export default mongoose.model('Review', ReviewSchema);