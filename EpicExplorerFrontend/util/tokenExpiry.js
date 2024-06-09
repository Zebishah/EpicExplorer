import { jwtDecode } from "jwt-decode";
export const isTokenExpired = (token) => {
    if (!token) {
        return true;
    }

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Current time in seconds
        console.log(decoded)
        // Check if the token has expired
        return decoded.exp < currentTime;
    } catch (error) {
        console.error("Invalid token:", error);
        return true; // Treat invalid token as expired
    }
};
export default isTokenExpired;