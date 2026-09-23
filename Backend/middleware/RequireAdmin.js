const requireAdmin = (req, res, next) => {
    if (!req.auth || req.auth.type !== 'admin') {
        return res.status(403).json({ success: false, message: 'Administrator access required.' });
    }
    next();
};

export const requireRole = (...roles) => (req, res, next) => {
    if (!roles.includes(req.admin?.role || req.auth?.role)) {
        return res.status(403).json({ success: false, message: 'You do not have permission for this action.' });
    }
    next();
};

export default requireAdmin;
