import express from 'express';
import verifyToken from '../middleware/IdFromToken.js';
import getUserById from '../middleware/UserFromId.js';
import { addBlog, deleteBlog, getBlogs, getTourBlogs } from '../Controllers/Blog-Controllers.js';
const BlogRoutes = express.Router();

BlogRoutes.post('/addBlog', addBlog);

BlogRoutes.get('/getBlog', getBlogs);

BlogRoutes.post('/getTourBlog', getTourBlogs);


// BlogRoutes.post('/getUserTourBlog', verifyToken, getUserById, deleteBlog);

// BlogRoutes.post('/getTourBlog', verifyToken, getUserById, updateBlog);

export default BlogRoutes