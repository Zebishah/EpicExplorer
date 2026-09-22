import express from 'express';
import { addHotel, countHotels, deleteHotel, getHotel, getHotelRooms, updateHotel } from '../Controllers/Hotel-Controllers.js';
import verifyToken from '../middleware/IdFromToken.js';
import getUserById from '../middleware/UserFromId.js';
import getAdminById from '../middleware/AdminFromId.js';
const HotelRoutes = express.Router();

HotelRoutes.post('/addHotel', verifyToken, getAdminById, addHotel);

HotelRoutes.get('/showHotel', getHotel);

HotelRoutes.post('/showHotelRooms', getHotelRooms);

HotelRoutes.post('/deleteHotel/:id', verifyToken, getAdminById, deleteHotel);

HotelRoutes.post('/updateHotel/:id', verifyToken, getAdminById, updateHotel);

HotelRoutes.get('/HotelCounter', countHotels);

export default HotelRoutes;
