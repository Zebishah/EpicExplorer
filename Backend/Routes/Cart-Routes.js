import express from 'express';
import { Decrease_Pro_Quant, Increase_Pro_Quant, confirmOrder, removeFromCart, showCart } from '../Controllers/Cart-Controller.js';


const CartRoutes = express.Router();

CartRoutes.get('/showCart', showCart);
CartRoutes.post('/increase_pro_quant/:id', Increase_Pro_Quant);
CartRoutes.post('/decrease_pro_quant/:id', Decrease_Pro_Quant);
CartRoutes.post('/removeFromCart/:id', removeFromCart);
// CartRoutes.post('/confirmOrder', confirmOrder);
CartRoutes.post('/create-checkout-session', confirmOrder);
export default CartRoutes;
