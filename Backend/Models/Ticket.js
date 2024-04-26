import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let userSchema = new Schema({
    ticketNo: {
        type: Number,
        required: true
    },
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
    }, tourName: {
        type: String,
        required: true
    }, ticketNo: {
        type: String,
        required: true
    },
    bookerAddress: {
        type: String,
        required: true
    },
})
export default mongoose.model('User', userSchema);