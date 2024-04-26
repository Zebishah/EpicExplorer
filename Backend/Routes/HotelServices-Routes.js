import express from 'express';
import { addHotelServices, getHotelServicesIT } from '../Controllers/HotelServices-Controllers.js';
import verifyToken from '../middleware/IdFromToken.js';
import getUserById from '../middleware/UserFromId.js';
import getAdminById from '../middleware/AdminFromId.js';
const HotelServicesRoutes = express.Router();

HotelServicesRoutes.post('/addHotelServices', verifyToken, getAdminById, addHotelServices);

HotelServicesRoutes.post('/getHotelServices', getHotelServicesIT);

export default HotelServicesRoutes;