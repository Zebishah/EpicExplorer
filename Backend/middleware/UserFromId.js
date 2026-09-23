import User from "../Models/User.js";

const getUserById = async (req, res, next) => {
    if (req.auth?.type === 'admin') {
        return res.status(403).json({ success: false, message: 'User access required.' });
    }
    const userId = req.userId;
    let user;// Assuming you have already extracted the userId from the token
    try {
        user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        if (user.isActive === false) {
            return res.status(403).json({ success: false, message: 'This account has been disabled.' });
        }
        if (String(user.verifiedStatus).toLowerCase() !== 'true') {
            return res.status(403).json({ success: false, message: 'Email verification is required.' });
        }

        req.user = user; // Attach the user object to the request object
        next();
        return;
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export default getUserById;
