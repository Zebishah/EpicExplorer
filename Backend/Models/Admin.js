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
    }, address: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    pic: {
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
        ref: "Room",

    }],
    addedTransports: [{
        type: mongoose.Types.ObjectId,
        ref: "Transport",

    }],
    handledTours: [{
        type: mongoose.Types.ObjectId,
        ref: "Tour",

    }], handledTransport: [{
        type: mongoose.Types.ObjectId,
        ref: "Transport",

    }], handledHotels: [{
        type: mongoose.Types.ObjectId,
        ref: "Hotel",

    }],
})
adminSchema.set('toJSON', {
    transform: (_doc, ret) => {
        delete ret.password;
        delete ret.SecretSeed;
        return ret;
    },
});

export default mongoose.model('Admin', adminSchema);
