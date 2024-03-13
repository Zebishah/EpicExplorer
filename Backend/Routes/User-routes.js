import express from 'express';

import { checkUserBalance, confirmOrder, confirmOrders, createUser, deleteUser, forgetPassword, getUsers, requestBalance, resetPassword, updatePassword, userLogin } from '../Controllers/User-Controllers.js';

const UserRoutes = express.Router();


UserRoutes.post('/createUser', createUser);

UserRoutes.post('/userLogin', userLogin);

UserRoutes.get('/getUsers', getUsers);

UserRoutes.get('/checkUserBalance', checkUserBalance);

UserRoutes.post('/deleteUser/:id', deleteUser);

UserRoutes.post('/updatePassword', updatePassword);

UserRoutes.post('/forgetPassword', forgetPassword);

UserRoutes.post("/resetPassword/:hash", resetPassword);

UserRoutes.post("/requestBalance", resetPassword);

UserRoutes.post('/create-payment-intent', confirmOrder);

UserRoutes.post('/create-checkout-session', confirmOrders);

UserRoutes.post('/requestBalance ', requestBalance);

export default UserRoutes;
