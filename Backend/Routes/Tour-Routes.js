import express from 'express';
import { addTour, countTours, deleteTour, filterTours, getFormData, getTours, openTour, perPageTours, searchTourById, searchTourByName, updateTour } from '../Controllers/Tour-Controllers.js';
import verifyToken from '../middleware/IdFromToken.js';
import getUserById from '../middleware/UserFromId.js';
const TourRoutes = express.Router();

TourRoutes.post('/addTour', verifyToken, addTour);

TourRoutes.get('/showTour', getTours);

TourRoutes.post('/deleteTour/:id', deleteTour);

TourRoutes.post('/updateTour/:id', updateTour);

TourRoutes.post('/filterTour', filterTours);

TourRoutes.get('/tourCounter', countTours);

TourRoutes.post('/perPageTours/:page', perPageTours);

TourRoutes.post('/openTour/:id', verifyToken, getUserById, openTour);

TourRoutes.post('/getFormData/:id', verifyToken, getUserById, getFormData)

TourRoutes.post('/searchTourByName', searchTourByName);

TourRoutes.post('/searchTour', searchTourById);

export default TourRoutes;
