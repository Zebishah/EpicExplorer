import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Product from '../Models/Product.js';
import User from '../Models/User.js';
import Admin from '../Models/Admin.js';
import CartProduct from '../Models/CartProduct.js';
import BookProduct from '../Models/BookProduct.js';
import mongoose from 'mongoose';
import Category from '../Models/Category.js';
import SubCategory from '../Models/SubCategory.js';
let initPrice, initDiscount = 0, success = null;
export const showSubCategory = async (req, res, next) => {
    // const extractedToken = req.header("auth-token");
    // let userId, i = 0;
    // if (!extractedToken || extractedToken.trim() == "") {
    //     return res.status(400).json({ message: "No user token found..." })
    // }

    // jwt.verify(extractedToken, process.env.JWT_SECRET, (err, decrypted) => {
    //     if (err) {
    //         return res.status(400).json({ message: "wrong one token is not authenticated...", error: err })
    //     }
    //     else {
    //         userId = decrypted.id;
    //     }
    // })

    // let user;
    // try {
    //     user = await User.findById(userId);
    // } catch (error) {
    //     return next(error);
    // }
    // if (!user) {
    //     return res.status(400).json({ message: "This User is not existed" });
    // }



    let subcategories = [];
    try {

        subcategories = await SubCategory.find();

    } catch (error) {
        return next(error);
    }

    if (!subcategories) {
        success = false
        return res.status(400).json({ success, message: "no subcategories found" })
    }
    success = true;
    return res.status(200).json({ success, message: "here are your all subcategories", subcategories: subcategories })
}
export const createSubCategory = async (req, res, next) => {
    const extractedToken = req.header("auth-token");
    let adminId;
    if (!extractedToken && extractedToken.trim() == "") {
        success = false;
        return res.status(400).json({ success, message: "No token found..." })
    }

    jwt.verify(extractedToken, process.env.JWT_SECRET, (err, decrypted) => {
        if (err) {
            success = false;
            return res.status(400).json({ success, message: "wrong one token is not authenticated...", error: err })
        }
        else {
            adminId = decrypted.id;
        }
    })
    let admin;
    try {

        admin = await Admin.findById(adminId);
    } catch (error) {
        return next(error);
    }
    const result = validationResult(req);

    if (!result.isEmpty()) {
        success = false;
        const errorMessages = result.array().map(error => error.msg);

        return res.status(400).json({ success, error: errorMessages });
    } else {
        let { parentCategoryId, name, pic, products, category } = req.body;

        let existingSubCategory;
        existingSubCategory = await Category.findOne({ name });
        if (existingSubCategory) {
            success = false;
            return res.status(400).json({ success, message: "subCategory is already existed" })
        }
        let parentCategory;
        parentCategory = await Category.findById(parentCategoryId);
        if (!parentCategory) {
            success = false;
            return res.status(400).json({ success, message: "Category is not existed" })
        }

        let subcategory;
        try {
            subcategory = new SubCategory({ parentCategoryId, name, pic, admin: admin.id, products, category: parentCategory })
            subcategory = await subcategory.save();
        } catch (error) {
            return next(error);
        }
        const session = await mongoose.startSession();
        session.startTransaction();
        await subcategory.save({ session });
        // existingProduct.buyers.push(user.id);
        // existingProduct.sells = existingProduct.sells + 1;
        // existingProduct.quantity = existingProduct.quantity - 1;
        if (parentCategoryId == parentCategory.id) {
            parentCategory.subCategory.push(subcategory.id)
            await parentCategory.save({ session });

            await subcategory.save({ session });
        }

        await session.commitTransaction();

        if (!subcategory) {
            success = false;
            return res.status(400).json({ success, message: "subCategory not found" })
        }
        success = true;
        return res.status(200).json({ success, message: "subCategory created successfully", subcategory: subcategory })
    }
}
export const clickSubCategory = async (req, res, next) => {
    let id = req.params.id;

    let products;
    try {
        products = await SubCategory.findById(id).populate("products");
    } catch (error) {
        return console.log(error);
    }
    if (!products) {
        success = false;
        return res.status(400).json({ success, message: "no products are found" })
    }

    // let category;
    // try {
    //     category = new Category({ name, pic, admin: admin.id, subCategory })
    //     category = await category.save();

    // } catch (error) {
    //     return next(error);
    // }
    // if (!category) {
    //     return res.status(400).json({ message: "category not found" })
    // }
    success = true;
    return res.status(200).json({ success, message: "here are your products :", products: products })
}


