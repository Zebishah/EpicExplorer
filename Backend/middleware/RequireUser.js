const requireUser = (req, res, next) => {
    if (req.auth?.type === 'admin') {
        return res.status(403).json({ success: false, message: 'User access required.' });
    }
    next();
};

export default requireUser;
