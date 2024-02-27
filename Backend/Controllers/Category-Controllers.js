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
export const showCategory = async (req, res, next) => {
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



    let categories = [];
    try {

        categories = await Category.find();

    } catch (error) {
        return next(error);
    }

    if (!categories) {
        success = false;
        return res.status(400).json({ success, message: "no Categories found" })
    }
    success = true
    res.status(200).json({ success, message: "here are your all Categories", Categories: categories })
}
export const createCategory = async (req, res, next) => {
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
        let { name, pic, subCategory } = req.body;

        let existingCategory;
        try {
            existingCategory = await Category.findOne({ name });
        } catch (error) {
            return next(error);
        }
        if (existingCategory) {
            success = false;
            return res.status(400).json({ message: "category is already existed" })
        }

        let category;
        try {
            category = new Category({ name, pic, admin: admin.id, subCategory })
            category = await category.save();

        } catch (error) {
            return next(error);
        }
        if (!category) {
            success = false;
            return res.status(400).json({ success, message: "category not found" })
        }
        success = true;
        return res.status(200).json({ success, message: "category created successfully", category: category })
    }
}
export const clickCategory = async (req, res, next) => {
    let id = req.params.id;

    let subCategory;
    try {
        subCategory = await Category.findById(id).populate("subCategory");
    } catch (error) {
        return console.log(error);
    }
    if (!subCategory) {
        success = false;
        return res.status(400).json({ success, message: "no subcategories are found" })
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
    return res.status(200).json({ success, message: "here are your subcategories :", subCategory: subCategory })
}

