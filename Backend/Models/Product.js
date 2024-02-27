import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let productsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
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
    parentId: {
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
    pics: [{
        type: String,
        required: true
    }],
    sizes: [{
        type: String,
        required: true
    }],
    reviews: [{
        type: String,
        required: true
    }],
    admins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",

    }],
    buyers: [{
        type: mongoose.Types.ObjectId,
        ref: "User",

    }],
    available: {
        type: Boolean,
    }
});
export default mongoose.model('Product', productsSchema);