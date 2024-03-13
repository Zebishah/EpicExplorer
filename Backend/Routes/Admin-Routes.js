import express from 'express';
import { HotelBookings, TourBookings, TransportBookings, addBalance, adminLogin, checkBalance, createAdmin, getAdmins } from '../Controllers/Admin-Controllers.js';
import { body } from 'express-validator';
const AdminRoutes = express.Router();

//Admin Routes

AdminRoutes.post('/createAdmin', createAdmin);//create admin route

AdminRoutes.post('/adminLogin', adminLogin);

AdminRoutes.get('/getAdmins', getAdmins);

AdminRoutes.post('/addBalance', addBalance);

AdminRoutes.get('/checkAdminBalance', checkBalance);

AdminRoutes.get('/HotelBookings', HotelBookings);

AdminRoutes.get('/TransportBookings', TransportBookings);

AdminRoutes.get('/TourBookings', TourBookings);

export default AdminRoutes;
