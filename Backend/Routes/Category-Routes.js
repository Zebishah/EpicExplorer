import express from 'express';
import { createCategory, showCategoryTours } from '../Controllers/Category-Controllers.js';


const CategoryRoutes = express.Router();

CategoryRoutes.post('/addCategory', createCategory);

CategoryRoutes.post('/showCategoryTours', showCategoryTours);

export default CategoryRoutes;
