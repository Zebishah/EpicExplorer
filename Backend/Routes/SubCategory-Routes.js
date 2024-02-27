import express from 'express';
import { clickSubCategory, createSubCategory, showSubCategory } from '../Controllers/SubCategory-Controllers.js';
import { body } from 'express-validator';

const SubcategoryRoutes = express.Router();

SubcategoryRoutes.post('/addSubCategory', [
    body("parentCategoryId", "Please enter category id").notEmpty(),
    body("name", "Please enter category name").notEmpty(),
    body("pic", "Please enter category pic").notEmpty(),
], createSubCategory);

SubcategoryRoutes.get('/showSubCategory', showSubCategory);

SubcategoryRoutes.post('/clickSubCategory/:id', clickSubCategory);


export default SubcategoryRoutes;
