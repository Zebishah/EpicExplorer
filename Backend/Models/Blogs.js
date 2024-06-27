import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let BlogSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    AccommodationId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        required: true
    },
    words: {
        type: String,
        required: true
    },


});
export default mongoose.model('Blog', BlogSchema);