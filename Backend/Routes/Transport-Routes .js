import express from 'express';
import { addTransport, countTransports, deleteTransport, filterTransport, getFormData, getTransport, openTransport, searchTransportById, searchTransportByName, transportPayment, updateTransport } from '../Controllers/Transport-Controllers.js';
import verifyToken from '../middleware/IdFromToken.js';
import getUserById from '../middleware/UserFromId.js';
import getAdminById from '../middleware/AdminFromId.js';
const TransportRoutes = express.Router();

TransportRoutes.post('/addTransport', verifyToken, getAdminById, addTransport);

TransportRoutes.get('/showTransport', getTransport);

TransportRoutes.post('/filterTransport', filterTransport);

TransportRoutes.post('/deleteTransport/:id', verifyToken, getAdminById, deleteTransport);

TransportRoutes.post('/updateTransport/:id', verifyToken, getAdminById, updateTransport);

TransportRoutes.post('/TransportPayment/:id', verifyToken, getUserById, transportPayment);

TransportRoutes.post('/openTransport/:id', verifyToken, getUserById, openTransport);

TransportRoutes.post('/getTransportFormData/:id', verifyToken, getUserById, getFormData)

TransportRoutes.get('/TransportCounter', countTransports);

TransportRoutes.post('/searchTransportByName', searchTransportByName);

TransportRoutes.post('/searchTransportById', searchTransportById);

export default TransportRoutes;
