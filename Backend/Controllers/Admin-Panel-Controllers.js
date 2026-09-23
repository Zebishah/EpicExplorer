import User from '../Models/User.js';
import Admin from '../Models/Admin.js';
import Tour from '../Models/Tour.js';
import Hotels from '../Models/Hotels.js';
import Room from '../Models/Room.js';
import Transport from '../Models/Transport.js';
import Blogs from '../Models/Blogs.js';
import Categorie from '../Models/Categorie.js';
import Review from '../Models/Review.js';
import BookingTour from '../Models/BookingTour.js';
import BookingHotel from '../Models/BookingHotel.js';
import BookingTransport from '../Models/BookingTransport.js';
import NotificationsAdmin from '../Models/NotificationsAdmin.js';
import StripePayment from '../Models/StripePayment.js';

const resources = {
    users: User,
    admins: Admin,
    tours: Tour,
    hotels: Hotels,
    rooms: Room,
    transports: Transport,
    blogs: Blogs,
    categories: Categorie,
    reviews: Review,
    'tour-bookings': BookingTour,
    'hotel-bookings': BookingHotel,
    'transport-bookings': BookingTransport,
    notifications: NotificationsAdmin,
    payments: StripePayment,
};

const safe = (value) => {
    const item = value?.toObject ? value.toObject() : { ...value };
    delete item.password;
    delete item.SecretSeed;
    delete item.token;
    return item;
};

const getModel = (resource) => resources[resource] || null;

const queryFor = (model, query) => {
    const search = String(query.search || '').trim();
    if (!search) return {};
    const fields = Object.entries(model.schema.paths)
        .filter(([name, path]) => path.instance === 'String' && !name.startsWith('_'))
        .slice(0, 12)
        .map(([name]) => ({ [name]: { $regex: search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' } }));
    return fields.length ? { $or: fields } : {};
};

const writablePayload = (model, body) => {
    const allowed = new Set(Object.keys(model.schema.paths).filter((key) => !['_id', '__v', 'createdAt', 'updatedAt', 'password', 'SecretSeed', 'AccountId', 'token'].includes(key)));
    return Object.fromEntries(Object.entries(body || {}).filter(([key]) => allowed.has(key)));
};

export const getAdminDashboard = async (req, res) => {
    try {
        const [users, activeUsers, admins, tours, hotels, transports, bookings, reviews, blogs, pendingVerification] = await Promise.all([
            User.countDocuments(),
            User.countDocuments({ isActive: { $ne: false } }),
            Admin.countDocuments({ isActive: { $ne: false } }),
            Tour.countDocuments(),
            Hotels.countDocuments(),
            Transport.countDocuments(),
            Promise.all([BookingTour.countDocuments(), BookingHotel.countDocuments(), BookingTransport.countDocuments()]).then((counts) => counts.reduce((sum, count) => sum + count, 0)),
            Review.countDocuments(),
            Blogs.countDocuments(),
            User.countDocuments({ verifiedStatus: { $ne: 'true' } }),
        ]);
        const recentUsers = await User.find().select('-password -SecretSeed').sort({ createdAt: -1 }).limit(5).lean();
        return res.json({ success: true, data: { counts: { users, activeUsers, admins, tours, hotels, transports, bookings, reviews, blogs, pendingVerification }, recentUsers } });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Unable to load the admin dashboard.' });
    }
};

export const listAdminResources = async (req, res) => {
    const Model = getModel(req.params.resource);
    if (!Model) return res.status(404).json({ success: false, message: 'Unknown admin resource.' });
    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, Number.parseInt(req.query.limit, 10) || 20));
    try {
        const filter = queryFor(Model, req.query);
        if (req.params.resource === 'users' && req.query.verified === 'true') filter.verifiedStatus = 'true';
        if (req.params.resource === 'users' && req.query.verified === 'false') filter.verifiedStatus = { $ne: 'true' };
        const [items, total] = await Promise.all([
            Model.find(filter).sort({ createdAt: -1, Date: -1 }).skip((page - 1) * limit).limit(limit).lean(),
            Model.countDocuments(filter),
        ]);
        return res.json({ success: true, data: items.map(safe), pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Unable to load this admin resource.' });
    }
};

export const getAdminResource = async (req, res) => {
    const Model = getModel(req.params.resource);
    if (!Model) return res.status(404).json({ success: false, message: 'Unknown admin resource.' });
    try {
        const item = await Model.findById(req.params.id).lean();
        if (!item) return res.status(404).json({ success: false, message: 'Record not found.' });
        return res.json({ success: true, data: safe(item) });
    } catch {
        return res.status(400).json({ success: false, message: 'Invalid record id.' });
    }
};

export const createAdminResource = async (req, res) => {
    const Model = getModel(req.params.resource);
    if (!Model || ['users', 'admins', 'reviews', 'tour-bookings', 'hotel-bookings', 'transport-bookings', 'payments', 'notifications'].includes(req.params.resource)) {
        return res.status(403).json({ success: false, message: 'This resource is read-only from the admin panel.' });
    }
    try {
        const created = await Model.create(writablePayload(Model, req.body));
        return res.status(201).json({ success: true, data: safe(created), message: 'Record created.' });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const fields = Object.values(error.errors || {}).map((item) => item.path).filter(Boolean);
            return res.status(400).json({ success: false, message: `Please complete the required fields: ${fields.join(', ')}.` });
        }
        return res.status(400).json({ success: false, message: 'Unable to create this record.' });
    }
};

export const updateAdminResource = async (req, res) => {
    const Model = getModel(req.params.resource);
    if (!Model || ['admins', 'payments', 'tour-bookings', 'hotel-bookings', 'transport-bookings'].includes(req.params.resource)) {
        return res.status(403).json({ success: false, message: 'This resource cannot be edited here.' });
    }
    try {
        const item = await Model.findByIdAndUpdate(req.params.id, { $set: writablePayload(Model, req.body) }, { new: true, runValidators: true });
        if (!item) return res.status(404).json({ success: false, message: 'Record not found.' });
        return res.json({ success: true, data: safe(item), message: 'Record updated.' });
    } catch (error) {
        return res.status(400).json({ success: false, message: 'Unable to update this record.' });
    }
};

export const deleteAdminResource = async (req, res) => {
    const Model = getModel(req.params.resource);
    if (!Model || ['admins', 'payments', 'tour-bookings', 'hotel-bookings', 'transport-bookings', 'reviews'].includes(req.params.resource)) {
        return res.status(403).json({ success: false, message: 'This resource cannot be deleted here.' });
    }
    try {
        const item = await Model.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: 'Record not found.' });
        return res.json({ success: true, message: 'Record deleted.' });
    } catch {
        return res.status(400).json({ success: false, message: 'Unable to delete this record.' });
    }
};

export const updateAdminUserStatus = async (req, res) => {
    if (String(req.params.id) === String(req.admin._id)) return res.status(400).json({ success: false, message: 'You cannot disable your own administrator account.' });
    if (typeof req.body.isActive !== 'boolean') return res.status(400).json({ success: false, message: 'isActive must be true or false.' });
    const user = await User.findByIdAndUpdate(req.params.id, { isActive: req.body.isActive }, { new: true }).select('-password -SecretSeed');
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });
    return res.json({ success: true, data: safe(user), message: `User ${req.body.isActive ? 'enabled' : 'disabled'}.` });
};
