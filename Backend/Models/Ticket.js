import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let userSchema = new Schema({
    members: [{
        type: String,
        required: true
    }], bookerName: {
        type: String,
        required: true
    },
    bookerEmail: {
        type: String,
        required: true
    },
    bookerPhone: {
        type: String,
        required: true
    },
    bookerAddress: {
        type: String,
        required: true
    },
})
export default mongoose.model('User', userSchema);