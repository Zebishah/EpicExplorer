import express from 'express';
import verifyToken from '../middleware/IdFromToken.js';
import getUserById from '../middleware/UserFromId.js';
import { addReviews, countReviews, getHotelReviews, getReviews, getTourReviews, getTransportReviews, getUserHotelReviews, getUserReviews, getUserTourReviews, getUserTransportReviews } from '../Controllers/Review-Controllers.js';
const ReviewsRoutes = express.Router();

ReviewsRoutes.post('/addReviews', verifyToken, getUserById, addReviews);

ReviewsRoutes.get('/getReviews', getReviews);

ReviewsRoutes.post('/getUserTourReviews', verifyToken, getUserById, getUserTourReviews);

ReviewsRoutes.post('/getUseHotelReviews', verifyToken, getUserById, getUserHotelReviews);

ReviewsRoutes.post('/getUserTransportReviews', verifyToken, getUserById, getUserTransportReviews);

ReviewsRoutes.post('/getTourReviews', getTourReviews);

ReviewsRoutes.post('/getHotelReviews', getHotelReviews);

ReviewsRoutes.post('/getTransportReviews', getTransportReviews);

ReviewsRoutes.post('/getUserReviews', verifyToken, getUserById, getUserReviews);

ReviewsRoutes.get('/ReviewCounter', countReviews);


export default ReviewsRoutes;