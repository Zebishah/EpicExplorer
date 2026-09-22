import express from 'express';
import { addTourServices, getTourServicesIT } from '../Controllers/TourServices-Controllers.js';
import verifyToken from '../middleware/IdFromToken.js';
import getUserById from '../middleware/UserFromId.js';
import getAdminById from '../middleware/AdminFromId.js';
const TourServiceRoutes = express.Router();

TourServiceRoutes.post('/addTourServices', verifyToken, getAdminById, addTourServices);

TourServiceRoutes.post('/getTourServices', getTourServicesIT);

export default TourServiceRoutes;
