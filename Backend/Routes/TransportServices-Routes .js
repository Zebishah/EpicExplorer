import express from 'express';
import { addTransportServices, getTransportServicesIT } from '../Controllers/TransportServices-Controllers.js';
import verifyToken from '../middleware/IdFromToken.js';
const TransportServicesRoutes = express.Router();

TransportServicesRoutes.post('/addTransportServices', addTransportServices);

TransportServicesRoutes.post('/getTransportServices', getTransportServicesIT);

export default TransportServicesRoutes;