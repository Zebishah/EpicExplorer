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

AdminRoutes.get('/getAdmins', getAllAdmin, getAdmins);

AdminRoutes.post('/addBalance', verifyToken, getAdminById, addBalance);

AdminRoutes.get('/checkAdminBalance', verifyToken, getAdminById, checkBalance);

AdminRoutes.get('/HotelBookings', HotelBookings);

AdminRoutes.get('/TransportBookings', TransportBookings);

AdminRoutes.get('/TourBookings', TourBookings);

AdminRoutes.post('/UserHotelBookings', UserHotelBookings);

AdminRoutes.post('/UserTransportBookings', UserTransportBookings);

AdminRoutes.post('/UserTourBookings', UserTourBookings);

export default AdminRoutes;
