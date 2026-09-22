import Token from "../Models/Token.js";
import crypto from "crypto";
import bcrypt from "bcrypt";

const tokenCreation = async (user) => {

    try {
        const token = crypto.randomBytes(32).toString("hex");
        const hash = bcrypt.hashSync(token, 10);
        let tokens = await Token.findOne({ userId: user.id })

        if (!tokens) {
            const newToken = new Token({
                userId: user.id,
                token: hash,
                createdAt: Date.now(),
            });

            await newToken.save();
        }

        return hash;
    } catch (error) {
        // Handle the error
        console.error("Error creating token:", error);
        throw error; // Rethrow the error to be caught by the caller
    }
};

export default tokenCreation;
