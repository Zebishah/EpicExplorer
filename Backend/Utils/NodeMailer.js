import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
    console.log(options.email)
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: 587,
            secure: false,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });

        const mailOptions = {
            from: process.env.USER,
            to: options.email,
            subject: "Password Reset Request",
            html: options.message,
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully.");
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email.");
    }
};

export default sendEmail;