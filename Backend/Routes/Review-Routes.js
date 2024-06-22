import express from 'express';
import verifyToken from '../middleware/IdFromToken.js';
import getUserById from '../middleware/UserFromId.js';
import { addReviews, countReviews, getReviews, getTourReviews, getUserHotelReviews, getUserReviews, getUserTourReviews, getUserTransportReviews } from '../Controllers/Review-Controllers.js';
const ReviewsRoutes = express.Router();

ReviewsRoutes.post('/addReviews/:id', verifyToken, getUserById, addReviews);

ReviewsRoutes.post('/getReviews', getReviews);

ReviewsRoutes.post('/getUserTourReviews', verifyToken, getUserById, getUserTourReviews);

ReviewsRoutes.post('/getUseHotelReviews', verifyToken, getUserById, getUserHotelReviews);

ReviewsRoutes.post('/getUserTransportReviews', verifyToken, getUserById, getUserTransportReviews);

ReviewsRoutes.post('/getTourReviews', verifyToken, getUserById, getTourReviews);

ReviewsRoutes.post('/getUserReviews', verifyToken, getUserById, getUserReviews);

ReviewRoutes.get('/ReviewCounter', countReviews);