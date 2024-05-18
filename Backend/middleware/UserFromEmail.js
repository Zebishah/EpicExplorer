import User from "../Models/User.js";

const UserFromEmail = async (req, res, next) => {
    const email = req.body.email;
    let user;
    try {
        user = await User.findOne({ email: email });

        req.user = user; // Attach the user object to the request object
        next();
        return;
        // This ensures that the code below does not execute after calling next()
    } catch (error) {
        return res.status(400).json({ success: false, message: 'No user found', statusCode: 400 });
    }

};

export default UserFromEmail;
