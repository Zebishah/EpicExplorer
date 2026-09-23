import express from 'express';
import { HotelBookings, TourBookings, TransportBookings, UserHotelBookings, UserTourBookings, UserTransportBookings, addBalance, adminLogin, checkBalance, getAdmins } from '../Controllers/Admin-Controllers.js';
import verifyToken from '../middleware/IdFromToken.js';
import getAdminByEmail from '../middleware/AdminFromEmail.js';
import getAllAdmin from '../middleware/AllAdmin.js';
import getAdminById from '../middleware/AdminFromId.js';
import requireAdmin, { requireRole } from '../middleware/RequireAdmin.js';
import { authRateLimit } from '../middleware/RateLimit.js';
import { getAdminDashboard, listAdminResources, getAdminResource, createAdminResource, updateAdminResource, deleteAdminResource, updateAdminUserStatus } from '../Controllers/Admin-Panel-Controllers.js';
const AdminRoutes = express.Router();

//Admin Routes

// Administrator creation is bootstrap-only. Use `npm run create:admin`.

AdminRoutes.post('/adminLogin', authRateLimit, getAdminByEmail, adminLogin);

AdminRoutes.get('/getAdmins', verifyToken, requireAdmin, getAdminById, getAllAdmin, getAdmins);

AdminRoutes.post('/addBalance', verifyToken, requireAdmin, getAdminById, addBalance);

AdminRoutes.get('/checkAdminBalance', verifyToken, requireAdmin, getAdminById, checkBalance);

AdminRoutes.get('/HotelBookings', verifyToken, requireAdmin, getAdminById, HotelBookings);

AdminRoutes.get('/TransportBookings', verifyToken, requireAdmin, getAdminById, TransportBookings);

AdminRoutes.get('/TourBookings', verifyToken, requireAdmin, getAdminById, TourBookings);

AdminRoutes.post('/UserHotelBookings', verifyToken, requireAdmin, getAdminById, UserHotelBookings);

AdminRoutes.post('/UserTransportBookings', verifyToken, requireAdmin, getAdminById, UserTransportBookings);

AdminRoutes.post('/UserTourBookings', verifyToken, requireAdmin, getAdminById, UserTourBookings);

AdminRoutes.use('/panel', verifyToken, requireAdmin, getAdminById);
AdminRoutes.get('/panel/dashboard', getAdminDashboard);
AdminRoutes.get('/panel/:resource', listAdminResources);
AdminRoutes.get('/panel/:resource/:id', getAdminResource);
AdminRoutes.post('/panel/:resource', requireRole('SUPER_ADMIN', 'ADMIN'), createAdminResource);
AdminRoutes.patch('/panel/:resource/:id', requireRole('SUPER_ADMIN', 'ADMIN'), updateAdminResource);
AdminRoutes.delete('/panel/:resource/:id', requireRole('SUPER_ADMIN'), deleteAdminResource);
AdminRoutes.patch('/panel/users/:id/status', requireRole('SUPER_ADMIN', 'ADMIN'), updateAdminUserStatus);

export default AdminRoutes;
