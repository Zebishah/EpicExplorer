import express from 'express';
import { HotelBookings, TourBookings, TransportBookings, UserHotelBookings, UserTourBookings, UserTransportBookings, addBalance, adminLogin, checkBalance, createAdmin, getAdmins } from '../Controllers/Admin-Controllers.js';
import { body } from 'express-validator';
import verifyToken from '../middleware/IdFromToken.js';
import getAdminByEmail from '../middleware/AdminFromEmail.js';
import getAllAdmin from '../middleware/AllAdmin.js';
import getAdminById from '../middleware/AdminFromId.js';
const AdminRoutes = express.Router();

//Admin Routes

AdminRoutes.post('/createAdmin', getAdminByEmail, createAdmin);//create admin route

AdminRoutes.post('/adminLogin', getAdminByEmail, adminLogin);

AdminRoutes.get('/getAdmins', verifyToken, getAdminById, getAllAdmin, getAdmins);

AdminRoutes.post('/addBalance', verifyToken, getAdminById, addBalance);

AdminRoutes.get('/checkAdminBalance', verifyToken, getAdminById, checkBalance);

AdminRoutes.get('/HotelBookings', verifyToken, getAdminById, HotelBookings);

AdminRoutes.get('/TransportBookings', verifyToken, getAdminById, TransportBookings);

AdminRoutes.get('/TourBookings', verifyToken, getAdminById, TourBookings);

AdminRoutes.post('/UserHotelBookings', verifyToken, getAdminById, UserHotelBookings);

AdminRoutes.post('/UserTransportBookings', verifyToken, getAdminById, UserTransportBookings);

AdminRoutes.post('/UserTourBookings', verifyToken, getAdminById, UserTourBookings);

export default AdminRoutes;
