import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let notificationAdminSchema = new Schema({
    accommodationName: {
        type: String,
        required: true
    },
    Category: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});
export default mongoose.model('notificationAdmin', notificationAdminSchema);