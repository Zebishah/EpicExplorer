import express from 'express';


import verifyToken from '../middleware/IdFromToken.js';
import getUserById from '../middleware/UserFromId.js';
import { getUserNotifications } from '../Controllers/Notification-Controllers.js';


const NotificationRoutes = express.Router();


NotificationRoutes.post('/getUserNotifications', verifyToken, getUserById, getUserNotifications);

export default NotificationRoutes;
