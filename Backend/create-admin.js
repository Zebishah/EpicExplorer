import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import StellarSdk from 'stellar-sdk';
import mongoose from 'mongoose';
import Admin from './Models/Admin.js';

dotenv.config();

const required = ['BOOTSTRAP_ADMIN_EMAIL', 'BOOTSTRAP_ADMIN_PASSWORD', 'BOOTSTRAP_ADMIN_NAME', 'BOOTSTRAP_ADMIN_PHONE'];
const missing = required.filter((key) => !process.env[key]?.trim());
if (missing.length) {
    console.error(`Missing bootstrap settings: ${missing.join(', ')}`);
    process.exitCode = 1;
} else {
    try {
        await mongoose.connect(process.env.MONGOURI);
        const email = process.env.BOOTSTRAP_ADMIN_EMAIL.trim().toLowerCase();
        const existing = await Admin.findOne({ email });
        if (existing) throw new Error('An administrator with this email already exists.');
        const pair = StellarSdk.Keypair.random();
        const admin = await Admin.create({
            name: process.env.BOOTSTRAP_ADMIN_NAME.trim(),
            email,
            phone: Number(process.env.BOOTSTRAP_ADMIN_PHONE),
            password: await bcrypt.hash(process.env.BOOTSTRAP_ADMIN_PASSWORD, 12),
            address: ' ',
            city: ' ',
            pic: ' ',
            AccountId: pair.publicKey(),
            SecretSeed: pair.secret(),
            Balance: 0,
            role: process.env.BOOTSTRAP_ADMIN_ROLE || 'SUPER_ADMIN',
        });
        console.log(`Administrator created: ${admin.email} (${admin.role})`);
    } catch (error) {
        console.error(error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
}
