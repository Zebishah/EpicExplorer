import express, { json } from 'express';
import connectDB from '../Backend/Db.js';
const app = express();
import AdminRoutes from './Routes/Admin-Routes.js';
import bodyParser from 'body-parser';
import CategoryRoutes from './Routes/Category-Routes.js';
import TourRoutes from './Routes/Tour-Routes.js';
import ServiceItrenaryRoutes from './Routes/TourServices-Routes.js';
import { config } from 'dotenv';
config();
import cors from 'cors';
import UserRoutes from './Routes/User-Routes.js';
import HotelRoutes from './Routes/Hotel-Routes.js';
import RoomRoutes from './Routes/Room-Routes.js';
import TransportRoutes from './Routes/Transport-Routes .js';
import TourServiceRoutes from './Routes/TourServices-Routes.js';
import HotelServicesRoutes from './Routes/HotelServices-Routes.js';
import TransportServicesRoutes from './Routes/TransportServices-Routes .js';

app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    credentials: true, // Allow cookies to be sent with the request
}));
app.use(json());

const port = process.env.PORT || 5000;
connectDB();
let host = process.env.REACT_APP_API_HOST

app.use('/Admin', AdminRoutes);
app.use('/User', UserRoutes);
app.use('/Tour', TourRoutes);
app.use('/Hotel', HotelRoutes);
app.use('/Room', RoomRoutes);
app.use('/Transport', TransportRoutes);
app.use('/Category', CategoryRoutes);
app.use('/ToServicesIt', TourServiceRoutes);
app.use('/HoServicesIt', HotelServicesRoutes);
app.use('/TrServicesIt', TransportServicesRoutes);
app.listen(port, () => {
    console.log("Server is Listening at Port" + host);
})