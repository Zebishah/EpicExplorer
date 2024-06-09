import express from 'express';
import verifyToken from '../middleware/IdFromToken.js';
import getUserById from '../middleware/UserFromId.js';
import { addUserFavorite, deleteUserFavorite, getUserFavorite } from '../Controllers/UserFavorite-Controllers.js';
const UserFavoriteRoutes = express.Router();

UserFavoriteRoutes.post('/addUserFavorite', verifyToken, getUserById, addUserFavorite);

UserFavoriteRoutes.post('/getUserFavorite', verifyToken, getUserById, getUserFavorite);

UserFavoriteRoutes.post('/deleteUserFavorite', deleteUserFavorite);

export default UserFavoriteRoutes;