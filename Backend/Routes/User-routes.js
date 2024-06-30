import express from 'express';

import { checkUserBalance, confirmOrder, confirmOrders, contactUs, countUserBookedRooms, countUserBookedTours, countUserBookedTransport, countUserTransactions, createUser, deleteUser, forgetPassword, getUserFrEmail, getUserFrToken, getUserInfo, getUsers, requestBalance, resendOtp, resetPassword, searchUserStellarAcc, stellarLedger, stellarPayment, updatePassword, updateUser, userHotelBookings, userLogin, userTourBookings, userTransportBookings, verifyOTP } from '../Controllers/User-Controllers.js';
import verifyToken from '../middleware/IdFromToken.js';
import UserFromEmail from '../middleware/UserFromEmail.js';
import getallUser from '../middleware/AllUser.js';
import getUserById from '../middleware/UserFromId.js';

const UserRoutes = express.Router();


UserRoutes.post('/createUser', UserFromEmail, createUser);

UserRoutes.post('/verifyOTP', verifyOTP);

UserRoutes.post('/resendOtp', resendOtp);

UserRoutes.post('/userLogin', UserFromEmail, userLogin);

UserRoutes.get('/getUsers', getallUser, getUsers);

UserRoutes.get('/checkUserBalance', verifyToken, getUserById, checkUserBalance);

UserRoutes.post('/deleteUser/:id', verifyToken, deleteUser);

UserRoutes.post('/updateUser', verifyToken, getUserById, updateUser);

UserRoutes.post('/updatePassword', verifyToken, getUserById, updatePassword);

UserRoutes.post('/forgetPassword', UserFromEmail, forgetPassword);

UserRoutes.post("/resetPassword", UserFromEmail, resetPassword);

UserRoutes.post('/create-payment-intent', verifyToken, confirmOrder);

UserRoutes.post('/create-checkout-session', verifyToken, getUserById, confirmOrders);

UserRoutes.post('/requestBalance', verifyToken, getUserById, requestBalance);

UserRoutes.post('/stellarPayment/:id', verifyToken, getUserById, stellarPayment);

UserRoutes.post("/TourHistory", verifyToken, getUserById, userTourBookings);

UserRoutes.post("/TransportHistory", verifyToken, getUserById, userTransportBookings);

UserRoutes.post("/HotelHistory", verifyToken, getUserById, userHotelBookings);

UserRoutes.post("/userInfo/:id", verifyToken, getUserById, getUserInfo);

UserRoutes.post("/userInfo", verifyToken, getUserById, getUserFrToken);

UserRoutes.post("/toursBooked", verifyToken, getUserById, countUserBookedTours);

UserRoutes.post("/userTotalTransactions", verifyToken, getUserById, countUserTransactions);

UserRoutes.post("/transportBooked", verifyToken, getUserById, countUserBookedTransport);

UserRoutes.post("/RoomsBooked", verifyToken, getUserById, countUserBookedRooms);

UserRoutes.post("/userInfoFrEmail", getUserFrEmail);

UserRoutes.get("/stellarLedger", stellarLedger);

UserRoutes.post("/contactUs", verifyToken, getUserById, contactUs);

UserRoutes.get("/searchStellarAccount", searchUserStellarAcc);

export default UserRoutes;
