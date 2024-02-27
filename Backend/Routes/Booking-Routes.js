import express from 'express';
import { body } from 'express-validator';
import { get } from 'mongoose';
import { wishProduct } from '../Controllers/Booking-Controllers.js';

const BookingRoutes = express.Router();

BookingRoutes.post('/buyProduct/:id', wishProduct);

export default BookingRoutes;
