import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let adminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    addedProducts: [{
        type: mongoose.Types.ObjectId,
        ref: "Product",

    },]
})
export default mongoose.model('Admin', adminSchema);