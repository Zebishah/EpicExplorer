import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let cartSchema = new Schema({

    products: [{
        type: mongoose.Types.ObjectId,
        ref: "Product",

    }],
    buyers: {
        type: mongoose.Types.ObjectId,
        ref: "User",

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

});
export default mongoose.model('Cart', cartSchema);