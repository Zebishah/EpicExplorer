import express from 'express';
import { addTransportServices, getTransportServicesIT } from '../Controllers/TransportServices-Controllers.js';
import verifyToken from '../middleware/IdFromToken.js';
import getAdminById from '../middleware/AdminFromId.js';
const TransportServicesRoutes = express.Router();

TransportServicesRoutes.post('/addTransportServices', verifyToken, getAdminById, addTransportServices);

TransportServicesRoutes.post('/getTransportServices', getTransportServicesIT);

export default TransportServicesRoutes;
