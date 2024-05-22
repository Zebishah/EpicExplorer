import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
const Schema = mongoose.Schema;
let UserOTPSchema = new Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date
    }

})

export default mongoose.model('UserOTP', UserOTPSchema);