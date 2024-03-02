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
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    AccountId: {
        type: String,
        required: true
    },
    SecretSeed: {
        type: String,
        required: true
    },
    Balance: {
        type: Number,
        required: true
    },
    Date: {
        type: Date,
        default: Date.now,
    },
    addedTrips: [{
        type: mongoose.Types.ObjectId,
        ref: "Tour",

    }],
    addedHotels: [{
        type: mongoose.Types.ObjectId,
        ref: "Product",

    }],
    addedTransports: [{
        type: mongoose.Types.ObjectId,
        ref: "Product",

    }],
    handledTours: [{
        type: mongoose.Types.ObjectId,
        ref: "Product",

    }]
})
export default mongoose.model('Admin', adminSchema);