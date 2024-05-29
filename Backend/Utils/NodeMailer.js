import nodemailer from 'nodemailer';

const sendEmail = async (options, res) => {
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
            subject: "Account creation",
            html: options.message,
        };

        // Using async/await for sendMail
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent successfully!");
            }
        });
    } catch (error) {
        console.error("Error in sending email:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error." });
    }
};

export default sendEmail;