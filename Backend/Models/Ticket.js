import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let ticketSchema = new Schema({
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
    },
    bookerAddress: {
        type: String,
        required: true
    },
})
export default mongoose.model('Ticket', ticketSchema);
