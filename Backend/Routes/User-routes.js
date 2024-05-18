import express from 'express';

import { checkUserBalance, confirmOrder, confirmOrders, createUser, deleteUser, forgetPassword, getUserInfo, getUsers, requestBalance, resetPassword, searchUserStellarAcc, stellarLedger, stellarPayment, updatePassword, userHotelBookings, userLogin, userTourBookings, userTransportBookings } from '../Controllers/User-Controllers.js';
import verifyToken from '../middleware/IdFromToken.js';
import UserFromEmail from '../middleware/UserFromEmail.js';
import getallUser from '../middleware/AllUser.js';
import getUserById from '../middleware/UserFromId.js';

const UserRoutes = express.Router();


UserRoutes.post('/createUser', UserFromEmail, createUser);

UserRoutes.post('/userLogin', UserFromEmail, userLogin);

UserRoutes.get('/getUsers', getallUser, getUsers);

UserRoutes.get('/checkUserBalance', verifyToken, getUserById, checkUserBalance);

UserRoutes.post('/deleteUser/:id', verifyToken, deleteUser);

UserRoutes.post('/updatePassword', verifyToken, getUserById, updatePassword);

UserRoutes.post('/forgetPassword', UserFromEmail, forgetPassword);

UserRoutes.post("/resetPassword", verifyToken, getUserById, resetPassword);

UserRoutes.post('/create-payment-intent', verifyToken, confirmOrder);

UserRoutes.post('/create-checkout-session', verifyToken, getUserById, confirmOrders);

UserRoutes.post('/requestBalance', verifyToken, getUserById, requestBalance);

UserRoutes.post('/stellarPayment/:id', verifyToken, getUserById, stellarPayment);

UserRoutes.post("/TourHistory/:id", verifyToken, getUserById, userTourBookings);

UserRoutes.post("/TransportHistory/:id", verifyToken, getUserById, userTransportBookings);

UserRoutes.post("/HotelHistory/:id", verifyToken, getUserById, userHotelBookings);

UserRoutes.post("/userInfo/:id", verifyToken, getUserById, getUserInfo);

UserRoutes.get("/stellarLedger", stellarLedger);

UserRoutes.get("/searchStellarAccount", searchUserStellarAcc);

export default UserRoutes;
