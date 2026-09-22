import express from 'express';
import { addBlog, getBlogs, getBlogsById, getTourBlogs } from '../Controllers/Blog-Controllers.js';
import verifyToken from '../middleware/IdFromToken.js';
import getAdminById from '../middleware/AdminFromId.js';
const BlogRoutes = express.Router();

BlogRoutes.post('/addBlog', verifyToken, getAdminById, addBlog);

BlogRoutes.get('/getBlog', getBlogs);

BlogRoutes.post('/getBlogById', getBlogsById);

BlogRoutes.post('/getTourBlog', getTourBlogs);


// BlogRoutes.post('/getUserTourBlog', verifyToken, getUserById, deleteBlog);

// BlogRoutes.post('/getTourBlog', verifyToken, getUserById, updateBlog);

export default BlogRoutes
