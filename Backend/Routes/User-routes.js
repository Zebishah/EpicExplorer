import express from 'express';

import { body } from 'express-validator';
import { get } from 'mongoose';
import { checkUserBalance, createUser, getUsers, userLogin } from '../Controllers/User-Controllers.js';
import { checkBalance } from '../Controllers/Admin-Controllers.js';
// const { query, validationResult, body } = require('express-validator');
const UserRoutes = express.Router();


UserRoutes.post('/createUser', [
    body("name", "Please enter your name").notEmpty(),
    body("email", "Please enter a valid Email").isEmail(),
    body("password", "Password can't be blank").notEmpty(),
], createUser);

UserRoutes.post('/userLogin', [
    body("email", "Please enter a valid Email").isEmail(),
    body("password", "Password can't be blank").notEmpty(),
], userLogin);
UserRoutes.get('/getUsers', getUsers);
UserRoutes.get('/checkUserBalance', checkUserBalance);
export default UserRoutes;
