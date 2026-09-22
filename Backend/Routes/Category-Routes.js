import express from 'express';
import { createCategory, showCategoryTours } from '../Controllers/Category-Controllers.js';
import verifyToken from '../middleware/IdFromToken.js';
import getAdminById from '../middleware/AdminFromId.js';


const CategoryRoutes = express.Router();

CategoryRoutes.post('/addCategory', verifyToken, getAdminById, createCategory);

CategoryRoutes.post('/showCategoryTours', showCategoryTours);

export default CategoryRoutes;
