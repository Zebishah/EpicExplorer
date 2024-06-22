import express from 'express';
import { addTransport, countTransports, deleteTransport, getFormData, getTransport, openTransport, searchTransportById, searchTransportByName, transportPayment, updateTransport } from '../Controllers/Transport-Controllers.js';
import verifyToken from '../middleware/IdFromToken.js';
import getUserById from '../middleware/UserFromId.js';
import getAdminById from '../middleware/AdminFromId.js';
const TransportRoutes = express.Router();

TransportRoutes.post('/addTransport', addTransport);

TransportRoutes.get('/showTransport', getTransport);

TransportRoutes.post('/deleteTransport/:id', verifyToken, deleteTransport);

TransportRoutes.post('/updateTransport/:id', updateTransport);

TransportRoutes.post('/TransportPayment/:id', verifyToken, getUserById, transportPayment);

TransportRoutes.post('/openTransport/:id', verifyToken, getUserById, openTransport);

TransportRoutes.post('/getTransportFormData/:id', verifyToken, getUserById, getFormData)

TransportRoutes.get('/TransportCounter', countTransports);

TransportRoutes.post('/searchTransportByName', searchTransportByName);

TransportRoutes.post('/searchTransportById', searchTransportById);

export default TransportRoutes;
