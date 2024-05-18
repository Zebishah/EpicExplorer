import express from 'express';
import verifyToken from '../middleware/IdFromToken.js';
import getUserById from '../middleware/UserFromId.js';
import { addBlog, deleteBlog, getBlogs } from '../Controllers/Blog-Controllers.js';
const BlogRoutes = express.Router();

BlogRoutes.post('/addReviews/:id', verifyToken, getUserById, addBlog);

BlogRoutes.post('/getReviews', getBlogs);

BlogRoutes.post('/getUserTourReviews', verifyToken, getUserById, deleteBlog);

BlogRoutes.post('/getTourReviews', verifyToken, getUserById, updateBlog);

