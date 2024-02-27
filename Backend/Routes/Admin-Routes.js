import express from 'express';
import { addBalance, adminLogin, checkBalance, createAdmin, getAdmins } from '../Controllers/Admin-Controllers.js';
import { body } from 'express-validator';
import { get } from 'mongoose';
// const { query, validationResult, body } = require('express-validator');
const AdminRoutes = express.Router();

AdminRoutes.post('/createAdmin', [
    body("name", "Please enter your name").notEmpty(),
    body("email", "Please enter a valid Email").isEmail(),
    body("password", "Password can't be blank").notEmpty(),
], createAdmin);
AdminRoutes.post('/adminLogin', [
    body("email", "Please enter a valid Email").isEmail(),
    body("password", "Password can't be blank").notEmpty(),
], adminLogin);
AdminRoutes.get('/getAdmins', getAdmins);
AdminRoutes.post('/addBalance', addBalance);
AdminRoutes.get('/checkAdminBalance', checkBalance);
export default AdminRoutes;
