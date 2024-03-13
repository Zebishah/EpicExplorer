import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.USER,
        pass: process.env.PASS,
    },
});

export default transporter;