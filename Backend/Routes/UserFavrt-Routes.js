import express from 'express';
import verifyToken from '../middleware/IdFromToken.js';
import getUserById from '../middleware/UserFromId.js';
import { addUserFavorite, deleteUserFavorite, getUserFavorite } from '../Controllers/UserFavorite-Controllers.js';
const UserFavoriteRoutes = express.Router();

UserFavoriteRoutes.post('/addUserFavorite/:id', verifyToken, getUserById, addUserFavorite);

UserFavoriteRoutes.post('/getUserFavorite', getUserFavorite);

UserFavoriteRoutes.post('/deleteUserFavorite', deleteUserFavorite);

export default UserFavoriteRoutes;