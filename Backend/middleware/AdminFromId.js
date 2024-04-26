import Admin from "../Models/Admin.js";


const getAdminById = async (req, res, next) => {
    const adminId = req.userId;
    let admin; // Assuming you have already extracted the userId from the token
    try {
        admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ success: false, message: 'admin not found' });
        }
        req.admin = admin; // Attach the user object to the request object
        next();
        return;
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export default getAdminById;