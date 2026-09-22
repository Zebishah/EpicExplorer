import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
    const host = process.env.SMTP_HOST || process.env.HOST || 'smtp.gmail.com';
    const port = Number(process.env.SMTP_PORT || 587);
    const secure = String(process.env.SMTP_SECURE).toLowerCase() === 'true';
    const user = process.env.SMTP_USER?.trim();
    // Gmail displays app passwords with spaces; remove them when copied into .env.
    const pass = process.env.SMTP_PASS?.replace(/\s/g, '');

    if (!user || !pass) {
        throw new Error('SMTP is not configured. Set SMTP_USER and SMTP_PASS in Backend/.env.');
    }

    const transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: {
            user,
            pass,
        },
    });

    return transporter.sendMail({
        from: user,
        to: options.email,
        subject: options.subject || 'EpicExplorer notification',
        html: options.message,
    });
};

export default sendEmail;
