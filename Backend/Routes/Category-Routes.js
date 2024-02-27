import express from 'express';
import { clickCategory, createCategory, showCategory } from '../Controllers/Category-Controllers.js';
import { body } from 'express-validator';
const CategoryRoutes = express.Router();

CategoryRoutes.post('/addCategory', [
    body("name", "Please enter category name").notEmpty(),
    body("pic", "Please enter category pic").notEmpty(),
], createCategory);

CategoryRoutes.get('/showCategory', showCategory);

CategoryRoutes.post('/clickCategory/:id', clickCategory);


export default CategoryRoutes;
