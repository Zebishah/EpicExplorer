import test from 'node:test';
import assert from 'node:assert/strict';
import { generateOtp, hashOtp } from '../Utils/Otp.js';

test('generates six-digit OTPs and hashes them deterministically', () => {
    const otp = generateOtp();
    assert.match(otp, /^\d{6}$/);
    assert.equal(hashOtp(otp), hashOtp(otp));
    assert.notEqual(hashOtp(otp), otp);
    assert.notEqual(hashOtp(otp), hashOtp('000000'));
});
