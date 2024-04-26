import express from 'express';
import verifyToken from '../middleware/IdFromToken.js';
import getUserById from '../middleware/UserFromId.js';
import { countBills, getHotelBillFUser, getTourBillFUser, getTransportBillFName } from '../Controllers/Bill-Controllers.js';
const BillRoutes = express.Router();

BillRoutes.get('/BillCounter', countBills);

BillRoutes.post('/getTourBill', getTourBill);
BillRoutes.post('/getTransportBill', verifyToken, getUserById, getTransportBill);
BillRoutes.post('/getHotelBill', verifyToken, getUserById, getHotelBill);
BillRoutes.post('/getUserTourBill', getUserTourBill);
BillRoutes.post('/getUserTransportBil', verifyToken, getUserById, getUserTransportBill);
BillRoutes.post('/getUserHotelBill', verifyToken, getUserById, getUserHotelBill);
BillRoutes.post('/searchTourBillFName', getTourBillFUser);
BillRoutes.post('/searchHotelBillFName', getHotelBillFUser);
BillRoutes.post('/searchTransportBillFName', getTransportBillFName);