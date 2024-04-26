import Token from "../Models/Token.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import moment from "moment";
import config from "../config.js"; // Assuming this is where your config is defined

const tokenCreation = async (user) => {
    try {
        const token = crypto.randomBytes(32).toString("hex");
        const hash = bcrypt.hashSync(token, 10);
        const expiry = moment.utc().add(config.tokenExpiry, "seconds");
        const newToken = new Token({
            userId: user._id,
            token: hash,
            createdAt: Date.now(),
        });
        console.log(hash)
        await newToken.save();
        return hash;
    } catch (error) {
        // Handle the error
        console.error("Error creating token:", error);
        throw error; // Rethrow the error to be caught by the caller
    }
};

export default tokenCreation;
