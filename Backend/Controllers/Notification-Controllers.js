import dotenv from 'dotenv';
import express, { response } from 'express';
import NotificationsUser from '../Models/NotificationsUser.js';

const app = express();
dotenv.config();

let success = null;

export const getUserNotifications = async (req, res, next) => {
    let allNotifications = [];
    let user = await req.user; // Getting User from middleware

    let userNotifications = [];
    try {
        // Searching specific user notifications
        userNotifications = await NotificationsUser.find({ user: user.userName });
    } catch (error) {
        return next(error);
    }

    const userCreationDate = user.createdAt;
    let userBNotifications = [];
    try {
        // Fetching broadcast notifications created on or after the user's creation date
        userBNotifications = await NotificationsUser.find({
            broadCast: "yes",
            date: { $gte: userCreationDate }
        });
    } catch (error) {
        return next(error);
    }

    if (!userNotifications.length && !userBNotifications.length) {
        return res.status(400).json({ success: false, message: "No user notifications are here", statusCode: 400 });
    }

    // Combine userNotifications and userBNotifications into one array
    allNotifications = [...userNotifications, ...userBNotifications];

    return res.status(200).json({
        success: true,
        message: "Here are all your notifications",
        userNotifications: allNotifications,
        statusCode: 200
    });
}
