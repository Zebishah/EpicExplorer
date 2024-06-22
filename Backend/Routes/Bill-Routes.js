import express from 'express';
import verifyToken from '../middleware/IdFromToken.js';
import getUserById from '../middleware/UserFromId.js';
import { countBills, getHotelBill, getHotelBillFUserId, getTourBill, getTourBillFUserId, getTransportBill, getTransportBillFUserId, getUserHotelBill, getUserTourBill, getUserTransportBill } from '../Controllers/Bill-Controllers.js';
const BillRoutes = express.Router();

BillRoutes.get('/BillCounter', countBills);

BillRoutes.post('/getTourBill', getTourBill);
BillRoutes.post('/getTransportBill', verifyToken, getUserById, getTransportBill);
BillRoutes.post('/getHotelBill', verifyToken, getUserById, getHotelBill);
BillRoutes.post('/getUserTourBill', verifyToken, getUserById, getUserTourBill);
BillRoutes.post('/getUserTransportBill', verifyToken, getUserById, getUserTransportBill);
BillRoutes.post('/getUserHotelBill', verifyToken, getUserById, getUserHotelBill);
BillRoutes.post('/searchTourBillFId', getTourBillFUserId);
BillRoutes.post('/searchHotelBillFId', getHotelBillFUserId);
BillRoutes.post('/searchTransportBillFId', getTransportBillFUserId);

export default BillRoutes;