import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const extractedToken = req.header('auth_token');
    if (!extractedToken || extractedToken.trim() === '') {
        return res.status(400).json({ success: false, message: 'No token found...' });
    }

    jwt.verify(extractedToken, process.env.JWT_SECRET, (err, decrypted) => {
        if (err) {
            return res.status(400).json({ success: false, message: 'Token is not authenticated...', error: err });
        }
        req.userId = decrypted.id;
        next();
    });
};

export default verifyToken;
