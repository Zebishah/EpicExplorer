import express, { json } from 'express';
import connectDB from './Db.js';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import AdminRoutes from './Routes/Admin-Routes.js';
import CategoryRoutes from './Routes/Category-Routes.js';
import TourRoutes from './Routes/Tour-Routes.js';
import ServiceItrenaryRoutes from './Routes/TourServices-Routes.js';
import { config } from 'dotenv';
config();
import cors from 'cors';
import UserRoutes from './Routes/User-routes.js';
import HotelRoutes from './Routes/Hotel-Routes.js';
import RoomRoutes from './Routes/Room-Routes.js';
import TransportRoutes from './Routes/Transport-Routes .js';
import TourServiceRoutes from './Routes/TourServices-Routes.js';
import HotelServicesRoutes from './Routes/HotelServices-Routes.js';
import TransportServicesRoutes from './Routes/TransportServices-Routes .js';
import UserFavoriteRoutes from './Routes/UserFavrt-Routes.js';
import NotificationRoutes from './Routes/Notification-Routes.js';
import BillRoutes from './Routes/Bill-Routes.js';
import ReviewsRoutes from './Routes/Review-Routes.js';
import BlogRoutes from './Routes/Blog-Routes.js';



const app = express();
const server = createServer(app);
const configuredOrigins = (process.env.CLIENT_ORIGIN || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174',
    ...configuredOrigins,
].filter((origin, index, origins) => origins.indexOf(origin) === index);
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
        }
        callback(new Error(`Origin ${origin} is not allowed by CORS`));
    },
    credentials: true,
};
const io = new Server(server, {
    cors: corsOptions,
});
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
    // io.emit('notification', "baba")
});

app.use(cors(corsOptions));
app.use(json());
const port = process.env.PORT || 5000;

app.get('/health', (_req, res) => {
    res.status(200).json({ success: true, service: 'epic-explorer-api' });
});

app.use('/Admin', AdminRoutes);
app.use('/Review', ReviewsRoutes);
app.use('/Notification', NotificationRoutes);
app.use('/User', UserRoutes);
app.use('/UserFavrt', UserFavoriteRoutes);
app.use('/Tour', TourRoutes);
app.use('/Blog', BlogRoutes);
app.use('/Bill', BillRoutes);
app.use('/Hotel', HotelRoutes);
app.use('/Room', RoomRoutes);
app.use('/Transport', TransportRoutes);
app.use('/Category', CategoryRoutes);
app.use('/ToServicesIt', TourServiceRoutes);
app.use('/HoServicesIt', HotelServicesRoutes);
app.use('/TrServicesIt', TransportServicesRoutes);
app.use((error, _req, res, _next) => {
    console.error(error);
    res.status(error.statusCode || 500).json({
        success: false,
        message: error.statusCode ? error.message : 'Internal server error',
    });
});

const startServer = async () => {
    await connectDB();
    server.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
};

if (process.argv[1] && fileURLToPath(import.meta.url) === fileURLToPath(`file://${process.argv[1]}`)) {
    startServer().catch((error) => {
        console.error(`Unable to start server: ${error.message}`);
        process.exitCode = 1;
    });
}

export { app, io, server };
export default io;
