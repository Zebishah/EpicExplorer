import express from 'express';
import { addHotel, countHotels, deleteHotel, getHotel, getHotelRooms, updateHotel } from '../Controllers/Hotel-Controllers.js';
import verifyToken from '../middleware/IdFromToken.js';
import getUserById from '../middleware/UserFromId.js';
const HotelRoutes = express.Router();

HotelRoutes.post('/addHotel', addHotel);

HotelRoutes.get('/showHotel', getHotel);

HotelRoutes.post('/showHotelRooms', getHotelRooms);

HotelRoutes.post('/deleteHotel/:id', verifyToken, deleteHotel);

HotelRoutes.post('/updateHotel/:id', updateHotel);

HotelRoutes.get('/HotelCounter', countHotels);

export default HotelRoutes;
