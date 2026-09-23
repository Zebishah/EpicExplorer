import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
const Schema = mongoose.Schema;
let userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    address: {
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
    googleSign: {
        type: String,
        required: true
    },
    verifiedStatus: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true,
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
    bookedTour: [{
        type: mongoose.Types.ObjectId,
        ref: "Tour",
    }],
    bookedHotels: [{

        type: mongoose.Types.ObjectId,
        ref: "Room",
    }],
    bookedTransport: [{

        type: mongoose.Types.ObjectId,
        ref: "Transport",
    }],
    wishList: [{

        type: mongoose.Types.ObjectId,
        ref: "UserFavrt",
    }],
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set to current date and time
    }

})

userSchema.set('toJSON', {
    transform: (_doc, ret) => {
        delete ret.password;
        delete ret.SecretSeed;
        return ret;
    },
});

export default mongoose.model('User', userSchema);
