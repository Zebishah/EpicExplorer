import Admin from "../Models/Admin.js";


const getAdminByEmail = async (req, res, next) => {
    const email = req.body.email;
    let admin; // Assuming you have already extracted the userId from the token
    try {
        admin = await Admin.findOne({ email: email });;
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

export default getAdminByEmail;