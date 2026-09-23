import express from 'express';

import { checkUserBalance, confirmOrder, confirmOrders, contactUs, countUserBookedRooms, countUserBookedTours, countUserBookedTransport, countUserTransactions, createUser, deleteUser, forgetPassword, getUserFrEmail, getUserFrToken, getUserInfo, requestBalance, resendOtp, resetPassword, searchUserStellarAcc, stellarLedger, stellarPayment, updatePassword, updateUser, userHotelBookings, userLogin, userTourBookings, userTransportBookings, verifyOTP } from '../Controllers/User-Controllers.js';
import verifyToken from '../middleware/IdFromToken.js';
import UserFromEmail from '../middleware/UserFromEmail.js';
import getUserById from '../middleware/UserFromId.js';
import { authRateLimit, otpRateLimit } from '../middleware/RateLimit.js';
import requireUser from '../middleware/RequireUser.js';

const UserRoutes = express.Router();
const verifyUserToken = (req, res, next) => verifyToken(req, res, () => requireUser(req, res, next));


UserRoutes.post('/createUser', authRateLimit, UserFromEmail, createUser);

UserRoutes.post('/verifyOTP', otpRateLimit, verifyOTP);

UserRoutes.post('/resendOtp', otpRateLimit, resendOtp);

UserRoutes.post('/userLogin', authRateLimit, UserFromEmail, userLogin);

UserRoutes.get('/checkUserBalance', verifyUserToken, getUserById, checkUserBalance);

UserRoutes.post('/deleteUser/:id', verifyUserToken, deleteUser);

UserRoutes.post('/updateUser', verifyUserToken, getUserById, updateUser);

UserRoutes.post('/updatePassword', verifyUserToken, getUserById, updatePassword);

UserRoutes.post('/forgetPassword', authRateLimit, UserFromEmail, forgetPassword);

UserRoutes.post("/resetPassword", UserFromEmail, resetPassword);

UserRoutes.post('/create-payment-intent', verifyUserToken, confirmOrder);

UserRoutes.post('/create-checkout-session', verifyUserToken, getUserById, confirmOrders);

UserRoutes.post('/requestBalance', verifyUserToken, getUserById, requestBalance);

UserRoutes.post('/stellarPayment/:id', verifyUserToken, getUserById, stellarPayment);

UserRoutes.post("/TourHistory", verifyUserToken, getUserById, userTourBookings);

UserRoutes.post("/TransportHistory", verifyUserToken, getUserById, userTransportBookings);

UserRoutes.post("/HotelHistory", verifyUserToken, getUserById, userHotelBookings);

UserRoutes.post("/userInfo/:id", verifyUserToken, getUserById, getUserInfo);

UserRoutes.post("/userInfo", verifyUserToken, getUserById, getUserFrToken);

UserRoutes.post("/toursBooked", verifyUserToken, getUserById, countUserBookedTours);

UserRoutes.post("/userTotalTransactions", verifyUserToken, getUserById, countUserTransactions);

UserRoutes.post("/transportBooked", verifyUserToken, getUserById, countUserBookedTransport);

UserRoutes.post("/RoomsBooked", verifyUserToken, getUserById, countUserBookedRooms);

UserRoutes.post("/userInfoFrEmail", getUserFrEmail);

UserRoutes.get("/stellarLedger", stellarLedger);

UserRoutes.post("/contactUs", verifyUserToken, getUserById, contactUs);

UserRoutes.get("/searchStellarAccount", searchUserStellarAcc);

export default UserRoutes;
