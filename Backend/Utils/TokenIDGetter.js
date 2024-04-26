import jwt from 'jsonwebtoken';
function extractIdFromToken(extractedToken, res) {
    let Id;
    if (!extractedToken || extractedToken.trim() === "") {

        res.status(400).json({ success: false, message: "No token found..." });
        return null;
    }

    jwt.verify(extractedToken, process.env.JWT_SECRET, (err, decrypted) => {
        if (err) {

            res.status(400).json({ success: false, message: "Token is not authenticated...", error: err });
            return null;
        } else {
            Id = decrypted.id;
        }
    });

    return Id;
}

export default extractIdFromToken;