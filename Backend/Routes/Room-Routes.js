import express from 'express';
import { addRoom, countRooms, deleteRoom, getFormData, getRoom, openRoom, roomPayment, searchRoom, updateRoom } from '../Controllers/Room-Controllers.js';
import verifyToken from '../middleware/IdFromToken.js';
import getUserById from '../middleware/UserFromId.js';
import getAdminById from '../middleware/AdminFromId.js';
const RoomRoutes = express.Router();

RoomRoutes.post('/addRoom', verifyToken, getAdminById, addRoom);

RoomRoutes.get('/showRooms', getRoom);

RoomRoutes.post('/deleteRoom/:id', verifyToken, getAdminById, deleteRoom);

RoomRoutes.post('/updateRoom/:id', updateRoom);

RoomRoutes.post('/RoomPayment/:id', verifyToken, getUserById, roomPayment);

RoomRoutes.post('/openRoom/:id', openRoom);

RoomRoutes.post('/getFormData/:id', verifyToken, getUserById, getFormData);

RoomRoutes.get('/RoomCounter', countRooms);

RoomRoutes.post('/searchRoom', searchRoom);

export default RoomRoutes;
