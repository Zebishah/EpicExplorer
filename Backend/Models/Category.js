import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        required: true
    },
    subCategory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
    }]
});
export default mongoose.model('Category', categorySchema);