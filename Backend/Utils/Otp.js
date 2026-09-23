import crypto from 'crypto';

export const OTP_TTL_MS = 10 * 60 * 1000;
export const OTP_MAX_ATTEMPTS = 5;
export const OTP_RESEND_COOLDOWN_MS = 60 * 1000;

export const generateOtp = () => crypto.randomInt(100000, 1000000).toString();

export const hashOtp = (otp) => crypto
    .createHash('sha256')
    .update(`${String(otp)}:${process.env.OTP_PEPPER || process.env.JWT_SECRET || 'epicexplorer-otp'}`)
    .digest('hex');

export const isOtpExpired = (expiresAt) => !expiresAt || new Date(expiresAt).getTime() <= Date.now();
