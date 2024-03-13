import express, { json } from 'express';
import connectDB from '../Backend/Db.js';
const app = express();
import AdminRoutes from './Routes/Admin-Routes.js';

import { config } from 'dotenv';
config();
import cors from 'cors';
import UserRoutes from './Routes/User-routes.js';

app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    credentials: true, // Allow cookies to be sent with the request
}));
app.use(json());

const port = process.env.PORT || 5000;
connectDB();
let host = process.env.REACT_APP_API_HOST



app.use('/Admin', AdminRoutes);
app.use('/User', UserRoutes);

app.use((req, res, next) => {
    next();
});

app.listen(port, () => {
    console.log("Server is Listening at Port" + host);
})