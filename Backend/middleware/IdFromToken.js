import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const authorization = req.header('authorization');
    const extractedToken = authorization?.startsWith('Bearer ')
        ? authorization.slice(7)
        : req.header('auth_token');
    if (!extractedToken || extractedToken.trim() === '') {
        return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ success: false, message: 'Authentication is not configured' });
    }

    jwt.verify(extractedToken, process.env.JWT_SECRET, (err, decrypted) => {
        if (err) {
            return res.status(401).json({ success: false, message: 'Invalid or expired token' });
        }
        req.userId = decrypted.id;
        req.auth = decrypted;
        next();
    });
};

export default verifyToken;
