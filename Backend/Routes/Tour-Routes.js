import express from 'express';
import { AllLatestTours, AllTourPackages, DiscountedTours, addTour, countTours, deleteTour, filterTours, getFormData, getTours, openTour, perPageTours, relatedTours, searchTourById, searchTourByName, tourPackages, updateTour } from '../Controllers/Tour-Controllers.js';
import verifyToken from '../middleware/IdFromToken.js';
import getUserById from '../middleware/UserFromId.js';
const TourRoutes = express.Router();

TourRoutes.post('/addTour', verifyToken, addTour);

TourRoutes.get('/showTour', getTours);

TourRoutes.post('/deleteTour/:id', deleteTour);

TourRoutes.post('/updateTour/:id', updateTour);

TourRoutes.post('/filterTour', filterTours);

TourRoutes.get('/TourPackages', tourPackages);

TourRoutes.get('/DiscountedTours', DiscountedTours);

TourRoutes.get('/LatestTour', AllLatestTours);

TourRoutes.get('/AllTourPackages', AllTourPackages);

TourRoutes.get('/tourCounter', countTours);

TourRoutes.post('/perPageTours', perPageTours);

TourRoutes.post('/openTour/:id', verifyToken, getUserById, openTour);

TourRoutes.post('/getFormData/:id', verifyToken, getUserById, getFormData)

TourRoutes.get('/searchTourByName', searchTourByName);

TourRoutes.post('/searchTour', searchTourById);

TourRoutes.post('/RelatedTour', relatedTours);

export default TourRoutes;
