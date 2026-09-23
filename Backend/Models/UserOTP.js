import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const UserOTPSchema = new Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },
    otpHash: {
        type: String,
        required: true
    },
    attempts: {
        type: Number,
        default: 0,
        min: 0,
    },
    expiresAt: {
        type: Date,
        required: true,
        index: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

UserOTPSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model('UserOTP', UserOTPSchema);
