import nodemailer from 'nodemailer';

const getSmtpConfig = () => {
    const user = process.env.SMTP_USER?.trim();
    const pass = process.env.SMTP_PASS?.replace(/\s/g, '');
    if (!user || !pass) return null;

    return {
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT || 587),
        secure: String(process.env.SMTP_SECURE).toLowerCase() === 'true',
        auth: { user, pass },
    };
};

export const isEmailConfigured = () => Boolean(getSmtpConfig());

let transporter;
const getTransporter = () => {
    if (!isEmailConfigured()) {
        throw new Error('Email delivery is not configured. Set SMTP_USER and SMTP_PASS in Backend/.env.');
    }
    if (!transporter) transporter = nodemailer.createTransport(getSmtpConfig());
    return transporter;
};

const layout = (title, body) => `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#182033;line-height:1.5"><h2>${title}</h2>${body}<p>EpicExplorer</p></body></html>`;

export const sendVerificationOtp = (email, otp) => getTransporter().sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: email,
    subject: 'Your EpicExplorer verification code',
    text: `Your EpicExplorer verification code is ${otp}. It expires in 10 minutes.`,
    html: layout('Verify your EpicExplorer account', `<p>Your verification code is:</p><p style="font-size:28px;font-weight:bold;letter-spacing:6px">${otp}</p><p>This code expires in 10 minutes. Never share it with anyone.</p>`),
});

export const sendPasswordReset = (email, resetUrl) => getTransporter().sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: email,
    subject: 'Reset your EpicExplorer password',
    text: `Reset your password using this link: ${resetUrl}. This link expires in one hour.`,
    html: layout('Reset your password', `<p><a href="${resetUrl}">Reset your password</a></p><p>This link expires in one hour.</p>`),
});

export default async function sendEmail(options) {
    return getTransporter().sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: options.email,
        subject: options.subject || 'EpicExplorer notification',
        text: options.text,
        html: options.message,
    });
}
