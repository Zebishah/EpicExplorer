import express from 'express';
import { addHotelServices, getHotelServicesIT } from '../Controllers/HotelServices-Controllers.js';

const HotelServicesRoutes = express.Router();

HotelServicesRoutes.post('/addHotelServices', addHotelServices);

HotelServicesRoutes.post('/getHotelServices', getHotelServicesIT);

export default HotelServicesRoutes;