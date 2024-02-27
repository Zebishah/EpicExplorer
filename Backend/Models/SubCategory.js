import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let subCategorySchema = new Schema({
    parentCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    name: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        required: true
    },
    admin: {
        type: String,
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",

    }],

});
export default mongoose.model('SubCategory', subCategorySchema);