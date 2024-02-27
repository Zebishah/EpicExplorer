import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Product from '../Models/Product.js';
import User from '../Models/User.js';
import Admin from '../Models/Admin.js';
import CartProduct from '../Models/CartProduct.js';
import BookProduct from '../Models/BookProduct.js';
import mongoose from 'mongoose';
import Bill from '../Models/Bill.js';
import Orders from '../Models/Orders.js';
import stripePackage from 'stripe';
const stripe = stripePackage('sk_test_51OlT63EhRIYwGoSWYxdywGa7AifEQNrEL8g4iMhOC86eV66ECypu6s7ZtcDpEnaXmHnfSacVy1fP2tvNITv7Ps9M00akr8Pdcb');
let initPrice, initDiscount = 0, initDiscountPrice = 0, success = null;
export const showCart = async (req, res, next) => {
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

    let user;
    try {
        user = await User.findById(userId);
    } catch (error) {
        return next(error);
    }
    if (!user) {
        success = false;
        return res.status(400).json({ success, message: "This User is not existed" });
    }
    let cartProducts = [], bill;
    try {

        cartProducts = await BookProduct.find({ buyer: user.id });

    } catch (error) {
        return next(error);
    }
    try {
        bill = await Bill.find({ user: user.id });

    } catch (error) {
        return next(error);
    }

    if (!cartProducts) {
        success = false;
        return res.status(400).json({ success, message: "no products found in store" })
    }
    if (!bill) {
        success = false;
        return res.status(400).json({ success, message: "no bill found in store" })
    }
    // if (productExists.proId) {
    // const isIdInArray = (array, idToCheck) => {
    //     return array.some(obj => obj.proId === idToCheck);
    // };
    // const idExists = isIdInArray(cartProducts, user.id);
    // const findObjectsById = (array, idToCheck) => {
    //     return array.filter(obj => obj.buyer.toString() === idToCheck);
    // };
    // const foundObjects = findObjectsById(cartProducts, user.id);

    // const findBillById = (array, idToCheck) => {
    //     return array.filter(obj => obj.user === idToCheck);
    // };
    // const foundBill = findObjectsById(bill, user.id);
    // const userExists = foundObject.buyer.toString() == user.id;

    // const userExists = foundObjects.some(obj => obj.buyer.toString() === user.id);

    success = true;
    return res.status(200).json({ message: "here are your all products", cartProducts: cartProducts, Bill: bill })
}
export const Increase_Pro_Quant = async (req, res, next) => {
    let id = req.params.id;
    let bill;
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

    let user;
    try {
        user = await User.findById(userId);
    } catch (error) {
        return next(error);
    }
    if (!user) {
        success = false;
        return res.status(400).json({ success, message: "This User is not existed" });
    }
    try {
        bill = await Bill.findOne({ user: user.id });

    } catch (error) {
        return next(error);
    }
    if (!bill) {
        success = false;
        return res.status(400).json({ success, message: "This bill is not existed" });
    }
    let cartProduct, product;
    try {

        cartProduct = await BookProduct.findById(id);
        product = await Product.findById(cartProduct.proId);
        // if (cartProduct.quantity == 1) {
        //     initPrice = cartProduct.price;
        //     initDiscount = cartProduct.discount;
        //     initDiscountPrice = cartProduct.discountPrice;
        // }
        const session = await mongoose.startSession();
        session.startTransaction();
        await bill.save({ session })
        await cartProduct.save({ session });

        if (cartProduct.quantity < 10) {
            // existingProduct.buyers.push(user.id);
            // existingProduct.sells = existingProduct.sells + 1;
            // existingProduct.quantity = existingProduct.quantity - 1;

            cartProduct.quantity = cartProduct.quantity + 1;
            cartProduct.discount = cartProduct.discount + product.discount;
            cartProduct.discountPrice = cartProduct.discountPrice + (product.price * (product.discount / 100));

            cartProduct.price = (product.price * cartProduct.quantity) - (product.price * (cartProduct.discount / 100));
            // console.log(initDiscount, initPrice, initDiscountPrice)

            bill.totalPrice = bill.totalPrice + product.price;

            bill.totalDiscount = bill.totalDiscount + (product.price * (product.discount / 100));
            bill.finalPrice = bill.totalPrice - bill.totalDiscount;


            await bill.save({ session })
            await cartProduct.save({ session });

            await session.commitTransaction();
        } else {
            success = false;
            return res.status(200).json({ success, message: "u cant increase more quantity", cartProduct: cartProduct, bill: bill })
        }

    } catch (error) {
        return next(error);
    }

    if (!cartProduct) {
        success = false;
        return res.status(400).json({ success, message: "no products found in store" })
    }
    success = true;
    return res.status(200).json({ success, message: "here are your all products quantity increases", cartProduct: cartProduct, bill: bill })
}

export const Decrease_Pro_Quant = async (req, res, next) => {
    let id = req.params.id;
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

    let user;
    try {
        user = await User.findById(userId);
    } catch (error) {
        return next(error);
    }
    if (!user) {
        success = false;
        return res.status(400).json({ success, message: "This User is not existed" });
    }
    let bill;
    try {
        bill = await Bill.findOne({ user: user.id });

    } catch (error) {
        return next(error);
    }
    if (!bill) {
        success = false;
        return res.status(400).json({ success, message: "This bill is not existed" });
    }
    let cartProduct, product;
    try {

        cartProduct = await BookProduct.findById(id);
        product = await Product.findById(cartProduct.proId);
        const session = await mongoose.startSession();
        session.startTransaction();
        await bill.save({ session })
        await cartProduct.save({ session });

        // existingProduct.buyers.push(user.id);
        // existingProduct.sells = existingProduct.sells + 1;
        // existingProduct.quantity = existingProduct.quantity - 1;

        if (cartProduct.quantity > 1) {
            cartProduct.quantity = cartProduct.quantity - 1;
            cartProduct.discount = cartProduct.discount - product.discount;
            cartProduct.discountPrice = cartProduct.discountPrice - (product.price * (product.discount / 100));
            cartProduct.price = (product.price * cartProduct.quantity) - (product.price * (cartProduct.discount / 100));
            bill.totalPrice = bill.totalPrice - product.price;
            bill.totalDiscount = bill.totalDiscount - (product.price * (product.discount / 100));
            bill.finalPrice = bill.totalPrice - bill.totalDiscount;

            // console.log(cartProduct.price, cartProduct.discount, cartProduct.discountPrice, bill.totalPrice, bill.totalDiscount, bill.finalPrice)




            await cartProduct.save({ session });
            await bill.save({ session });
            await session.commitTransaction();
        }

    } catch (error) {
        return next(error);
    }

    if (!cartProduct) {
        success = false
        return res.status(400).json({ success, message: "no products found in store" })
    }
    success = true;
    res.status(200).json({ success, message: "here are your all products quantity increases", cartProduct: cartProduct, bill: bill })
}
export const removeFromCart = async (req, res, next) => {
    let id = req.params.id;
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

    let user;
    try {
        user = await User.findById(userId);
    } catch (error) {
        return next(error);
    }
    if (!user) {
        success = false;
        return res.status(400).json({ success, message: "This User is not existed" });
    }
    let bill;
    try {
        bill = await Bill.findOne({ user: user.id });

    } catch (error) {
        return next(error);
    }
    if (!bill) {
        success = false;
        return res.status(400).json({ success, message: "This bill is not existed" });
    }
    let deletedProduct, product;

    try {

        deletedProduct = await BookProduct.findById(id);

        if (deletedProduct) {
            product = await Product.findById(deletedProduct.proId);
            const session = await mongoose.startSession();
            session.startTransaction();
            await bill.save({ session })
            await deletedProduct.save({ session });

            // existingProduct.buyers.push(user.id);
            // existingProduct.sells = existingProduct.sells + 1;
            // existingProduct.quantity = existingProduct.quantity - 1;


            // deletedProduct.quantity = deletedProduct.quantity - 1;
            // deletedProduct.discount = deletedProduct.discount - product.discount;
            // deletedProduct.discountPrice = deletedProduct.discountPrice - (product.price * (product.discount / 100));
            // deletedProduct.price = (product.price * deletedProduct.quantity) - (product.price * (deletedProduct.discount / 100));
            bill.totalPrice = bill.totalPrice - deletedProduct.price;
            bill.totalDiscount = bill.totalDiscount - deletedProduct.discountPrice;
            bill.finalPrice = bill.totalPrice - bill.totalDiscount;

            // console.log(cartProduct.price, cartProduct.discount, cartProduct.discountPrice, bill.totalPrice, bill.totalDiscount, bill.finalPrice)



            deletedProduct = await BookProduct.findByIdAndDelete(id);
            await deletedProduct.save({ session });
            await bill.save({ session });
            await session.commitTransaction();


            success = true;
            return res.status(200).json({ success, message: "product deleted successfully", deletedProduct: deletedProduct, bill: bill })
        }
        else (!deletedProduct)
        {
            success = false
            return res.status(400).json({ success, message: "product u wanna delete is not found" })
        }


    } catch (error) {
        return next(error);
    }


}
export const confirmOrder = async (req, res, next) => {

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

    let user;
    try {
        user = await User.findById(userId);
    } catch (error) {
        return next(error);
    }
    if (!user) {
        success = false;
        return res.status(400).json({ success, message: "This User is not existed" });
    }
    // let { userName, userPhone, userAddress } = req.body;
    // if (!userName || !userPhone || !userAddress) {
    //     return res.status(400).json({ message: "Please provide all required fields" });
    // }
    let order, orderNo = 0;
    let buyedProducts = await BookProduct.find({ buyer: user.id })
    let bill = await Bill.find({ user: user.id })
    if (!buyedProducts) {
        success = false;
        return res.status(400).json({ success, message: "this user has no cart products" });
    }

    const conversionRate = 2;

    const lineItems = buyedProducts.map((product) => ({
        price_data: {
            currency: "pkr",
            product_data: {
                name: product.name,

            },
            unit_amount: Math.round(product.price * conversionRate * 100),

            // Rounding to the nearest integer
        },
        quantity: product.quantity,

    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:3000/sucess",
        cancel_url: "http://localhost:3000/cancel",
    });




    // if (!Bill) {
    //     success = false;
    //     return res.status(400).json({ success, message: "this user has no Bill" });
    // }
    // let cartProduct;
    // try {
    //     cartProduct = new CartProduct({ userName, userEmail, userPhone, userAddress, buyedProducts: buyedProducts, Bill: Bill })

    // } catch (error) {
    //     return next(error);
    // }
    // try {
    //     orderNo = orderNo + 1;
    //     order = new Orders({ orderNo: orderNo, userName, userEmail, userPhone, userAddress, buyedProducts: buyedProducts, Bill: Bill })

    // } catch (error) {
    //     return next(error);
    // }
    // if (!(cartProduct)) {
    //     success = false;
    //     return res.status(400).json({ success, message: "no data is entered in cartProducts" });
    // }
    // if (!(orderNo)) {
    //     success = false;
    //     return res.status(400).json({ success, message: "no data is entered in orders" });
    // }
    success = true;
    return res.status(200).json({ success, message: "these are your products added", id: session });


}