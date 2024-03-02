import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let CategorySchema = new Schema({
    // parentCategoryId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Category",
    // },
    name: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tours: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tour",

    }],

});
export default mongoose.model('Categorie', CategorySchema);