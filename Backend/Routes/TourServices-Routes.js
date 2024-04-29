import express from 'express';
import { addTourServices, getTourServicesIT } from '../Controllers/TourServices-Controllers.js';
import verifyToken from '../middleware/IdFromToken.js';
import getUserById from '../middleware/UserFromId.js';
const TourServiceRoutes = express.Router();

TourServiceRoutes.post('/addTourServices', addTourServices);

TourServiceRoutes.post('/getTourServices', getTourServicesIT);

export default TourServiceRoutes;