import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import Product from '../Models/Product.js';
import Admin from '../Models/Admin.js';
import mongoose from 'mongoose';
import BookProduct from '../Models/BookProduct.js';
import User from '../Models/User.js';
import CartProduct from '../Models/CartProduct.js';
import Bill from '../Models/Bill.js';
//addProduct
let totalPrice = 0, totalDiscount = 0, deliveryCharges, finalPrice = 0, success = null;

export const wishProduct = async (req, res, next) => {
    let discountPrice = 0;
    let products = [], bill = [];
    let productt = [];
    let final_bill;
    let { size } = req.body;

    let pro_id = req.params.id;
    const extractedToken = req.header("auth-token");
    let userId, i = 0;
    if (!extractedToken || extractedToken.trim() == "") {
        success = false;
        return res.status(400).json({ success, message: "No user token found..." })
    }

    jwt.verify(extractedToken, process.env.JWT_SECRET, (err, decrypted) => {
        if (err) {
            success = false;
            return res.status(400).json({ success, message: "wrong one token is not authenticated...", error: err })
        }
        else {
            userId = decrypted.id;
        }
    })

    // let { name, price, company, quantity, sells, pic, buyers, available } = req.body;

    let user, discountedPrice, quant, BQuantity = 1;
    try {
        user = await User.findById(userId);
    } catch (error) {
        return next(error);
    }
    if (!user) {
        success = false;
        res.status(400).json({ success, message: "This Admin is not existed " });
    }
    let existingProduct;
    try {
        existingProduct = await Product.findById(pro_id);

        var { name, price, company, quantity, parentId, sells, rating, pics, buyers, reviews, description, discount } = existingProduct;

    } catch (error) {
        return console.log(error);
    }

    if (!existingProduct) {
        success = false;
        return res.status(400).json({ success, message: "Product not existed u cant buy it" });
    }
    let product, userExists, proFind, productExists;
    try {
        productExists = await BookProduct.findOne({ proId: existingProduct.id });
    } catch (error) {
        return console.log(error);
    }
    if (productExists) {
        success = false;
        return res.status(400).json({ success, message: "Product already existed in cart" });
    }

    try {
        userExists = await BookProduct.findOne({ buyer: user.id });
    } catch (error) {
        return console.log(error);
    }

    // if (productExists.proId) {
    // const isIdInArray = (array, idToCheck) => {
    //     return array.some(obj => obj.proId === idToCheck);
    // };
    // const idExists = isIdInArray(productExists, existingProduct.id);
    // const findObjectsById = (array, idToCheck) => {
    //     return array.filter(obj => obj.proId === idToCheck);
    // };
    // const foundObjects = findObjectsById(productExists, existingProduct.id);

    // // const userExists = foundObject.buyer.toString() == user.id;

    // const userExists = foundObjects.some(obj => obj.buyer.toString() === user.id);
    if (productExists && userExists) {
        success = false;
        return res.status(200).json({ success, message: "product is already in cart ", boughtProducts: products, user: user })
    }
    else {
        try {

            discountPrice = existingProduct.price * (existingProduct.discount / 100);

            product = new BookProduct({ proId: existingProduct.id, name, price, company, discount, discountPrice: discountPrice, pics, sells, buyer: user.id, quantity: BQuantity, remaining: quantity, category: parentId, size, description })
            // product2 = new CartProduct({ name, pic, price, company, buyer: userId, quantity: quantity, category, discount })
            await product.save();

            products.push({ proId: existingProduct.id, name, price, company, discount, discountPrice, pics, sells, buyer: user.id, quantity: BQuantity, remaining: quantity, category: parentId, size, description });


            const session = await mongoose.startSession();
            session.startTransaction();
            await existingProduct.save({ session });
            // existingProduct.buyers.push(user.id);
            // existingProduct.sells = existingProduct.sells + 1;
            // existingProduct.quantity = existingProduct.quantity - 1;
            quant = 1;
            let initPrice = existingProduct.price;




            // if (!user.wishList.includes(existingProduct.id)) {
            //     user.wishList.push(existingProduct.id);
            // }
            let billCheck = await Bill.findOne({ user: user.id });
            // const isBillInArray = (array, idToCheck) => {
            //     return array.some(obj => obj.user === idToCheck);
            // };
            // const idExists = isIdInArray(billCheck, user.id);
            // const findObjectsById = (array, idToCheck) => {
            //     return array.filter(obj => obj.user === idToCheck);
            // };
            // const foundObjects = findObjectsById(billCheck, user.id);

            // // const userExists = foundObject.buyer.toString() == user.id;

            // const userExists = foundObjects.some(obj => obj.user === user.id);

            if (!billCheck) {
                try {
                    final_bill = new Bill({ user: user.id, totalDiscount, deliveryCharges, totalPrice, finalPrice });
                    final_bill = await final_bill.save();
                } catch (error) {
                    return console.log(error);
                }
                await existingProduct.save({ session });
                await user.save({ session });
                await session.commitTransaction();
                success = true;
                return res.status(200).json({ success, message: "product added in cart successfully", boughtProducts: products, user: user, discountedPrice: discountedPrice, quantity: quant, bill: final_bill })
            }
            else {
                billCheck.totalDiscount = billCheck.totalDiscount + discountPrice;
                billCheck.totalPrice = billCheck.totalPrice + initPrice;
                billCheck.finalPrice = billCheck.totalPrice - billCheck.totalDiscount;
                await billCheck.save();

                await existingProduct.save({ session });
                await user.save({ session });
                await session.commitTransaction();
                success = true;
                return res.status(200).json({ success, message: "product added in cart successfully", boughtProducts: products, user: user, discountedPrice: discountedPrice, quantity: quant, bill: billCheck })
            }


        } catch (error) {
            return next(error);
        }



    }


}


