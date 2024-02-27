import express from 'express';
import { addFavrt, removeFromFavrt, showFavrts } from '../Controllers/UserFavrt-Controller.js';

const UserFavrtRoutes = express.Router();

UserFavrtRoutes.post('/addFavrt/:id', addFavrt);
UserFavrtRoutes.get('/showFavrt', showFavrts);
UserFavrtRoutes.post('/removeFavrt/:id', removeFromFavrt);
export default UserFavrtRoutes;
