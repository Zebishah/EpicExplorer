import Admin from "../Models/Admin.js";

const getAllAdmin = async (req, res, next) => {
    // Assuming you have already extracted the userId from the token
    try {
        const admin = await Admin.find();
        if (!admin) {
            return res.status(404).json({ success: false, message: 'admins not found' });
        }
        req.admin = admin; // Attach the user object to the request object
        next();
        return;
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export default getAllAdmin