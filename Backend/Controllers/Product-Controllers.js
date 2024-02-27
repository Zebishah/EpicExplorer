import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import Product from '../Models/Product.js';
import Admin from '../Models/Admin.js';
import mongoose from 'mongoose';
import SubCategory from '../Models/SubCategory.js';
import User from '../Models/User.js';
import Category from '../Models/Category.js';

//addProduct
let success = null;
export const addProduct = async (req, res, next) => {
    const extractedToken = req.header("auth-token");
    let adminId;
    if (!extractedToken && extractedToken.trim() == "") {
        return res.status(400).json({ message: "No token found..." })
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
    const result = validationResult(req);

    if (!result.isEmpty()) {
        success = false;
        const errorMessages = result.array().map(error => error.msg);

        return res.status(400).json({ success, error: errorMessages });
    } else {
        let { name, price, company, quantity, parentId, sells, rating, pics, buyers, reviews, sizes, description, discount, available } = req.body;
        if (quantity > 0) {
            available = true;
        }
        else {
            available = false
        }
        let admin;
        try {
            admin = await Admin.findById(adminId);
            success = true;
        } catch (error) {
            return next(error);
        }
        if (!admin) {
            success = false;
            return res.status(400).json({ success, message: "This Admin is not existed " });
        }
        let existingProduct;
        try {
            existingProduct = await Product.findOne({ name });

        } catch (error) {
            return next(error);
        }
        if (existingProduct) {
            success = false;
            return res.status(400).json({ success, message: "Product already existed " });
        }
        let parentCategory;
        try {
            parentCategory = await SubCategory.findById(parentId);
        } catch (error) {
            return next(error);
        }
        if (!parentCategory) {
            success = false;
            return res.status(400).json({ success, message: "Category is not existed" })
        }

        let product;
        try {
            product = new Product({ name, price, company, quantity, parentId, sells, rating, pics, admins: adminId, buyers, reviews, sizes, description, discount, available });

            const session = await mongoose.startSession();
            session.startTransaction();
            await product.save({ session });
            admin.addedProducts.push(product.id);
            await admin.save({ session });

            if (parentId == parentCategory.id) {
                parentCategory.products.push(product.id)
                await parentCategory.save({ session });

                await product.save({ session });
            }
            await session.commitTransaction();

        } catch (error) {
            return next(error);
        }
        if (!product) {
            success = false;
            return res.status(400).json({ success, message: "product not created" });
        }
        success = true;
        return res.status(200).json({ success, message: "product added successfully", product: product, admin: adminId })
    }
}

//get all products
export const getProducts = async (req, res, next) => {

    let Products;
    try {
        Products = await Product.find();
    } catch (error) {
        return next(error);
    }

    if (!Products) {
        success = false;
        return res.status(400).json({ success, message: "no products found in store" })
    }
    success = true;
    return res.status(200).json({ message: "here are your all products", Products: Products })
}

// delete a product
export const deleteProduct = async (req, res, next) => {
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
    const result = validationResult(req);

    if (!result.isEmpty()) {
        const errorMessages = result.array().map(error => error.msg);

        return res.status(400).json({ error: errorMessages });
    }
    let id = req.params.id;
    let deletedProduct;
    try {
        deletedProduct = await Product.findByIdAndDelete(id);
    } catch (error) {
        return next(error);
    }

    if (!deletedProduct) {
        success = false;
        return res.status(400).json({ success, message: "Product not existed that u are trying to delete" });
    }
    success = true;
    return res.status(200).json({ success, message: "product deleted successfully", deletedProduct: deletedProduct, admin: adminId })
}

export const openProduct = async (req, res, next) => {
    let relatedProducts = [];
    // let productt = []
    let discountedPrice, category, subCategory;
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

    let user;
    try {
        user = await User.findById(userId);
    } catch (error) {
        return next(error);
    }
    if (!user) {
        success = false;
        return res.status(400).json({ success, message: "This Admin is not existed " });
    }
    let existingProduct;
    try {
        existingProduct = await Product.findById(pro_id);

    } catch (error) {
        return next(error);
    }

    if (!existingProduct) {
        success = false;
        return res.status(400).json({ success, message: "Product not existed u cant buy it" });
    }
    var { name, price, company, quantity, parentId, sells, rating, pics, buyers, reviews, sizes, description, discount, available } = existingProduct;
    try {
        subCategory = await SubCategory.findById(parentId).populate("products");

    } catch (error) {
        return next(error);
    }
    try {
        category = await Category.findById(subCategory.parentCategoryId);

    } catch (error) {
        return next(error);
    }


    // let product, product2, proFind;
    try {
        let quant = 1;
        let initPrice = price;
        const session = await mongoose.startSession();
        session.startTransaction();
        await existingProduct.save({ session });
        discountedPrice = (initPrice * quant) * (1 - 0.02);
        relatedProducts = subCategory.products;

        // existingProduct.buyers.push(user.id);
        // existingProduct.sells = existingProduct.sells + 1;
        // existingProduct.quantity = existingProduct.quantity - 1;
        // user.wishList.push(existingProduct.id)
        await existingProduct.save({ session });

        await user.save({ session });
        await session.commitTransaction();


    } catch (error) {
        return next(error);
    }

    success = true;
    return res.status(200).json({ success, message: "product added in cart successfully", openedProduct: existingProduct, user: user, discountedPrice: discountedPrice, subCategory: subCategory.name, category: category.name, relatedProducts: relatedProducts })
}

export const filterProducts = async (req, res, next) => {


    let { category, price } = req.query;
    const sampleQueryObj = {}, QueryObj = {};


    if (category) {
        category = category.split(',');
        sampleQueryObj.name = category;
    }
    let existingCategory;
    if (sampleQueryObj) {

        try {
            existingCategory = await SubCategory.find(sampleQueryObj);



        } catch (error) {
            return console.log(error);
        }
        if (!existingCategory) {
            success = false;
            return res.status(400).json({ success, message: "category not found of filter" });
        }
    }
    const categoryIds = [];
    if (existingCategory) {
        // Array to store category IDs

        existingCategory.forEach(category => {
            categoryIds.push(category._id); // Push each category ID into the array
        });


    }
    if (categoryIds) {
        QueryObj.parentId = categoryIds;
    }

    if (price) {
        price.gte = parseInt(price.gte);
        price.lte = parseInt(price.lte);
        QueryObj.price = { $gte: price.gte, $lte: price.lte }
    }
    console.log(QueryObj)
    if (QueryObj) {
        let existingProduct;
        try {
            existingProduct = await Product.find(QueryObj);


        } catch (error) {
            return console.log(error);
        }
        success = true;
        return res.status(200).json({ success, existingProduct });


    }






}
export const perPageProducts = async (req, res, next) => {


    let page = req.params.page ? req.params.page : 1;
    let perPage = 4;

    if (page) {
        let existingProduct;
        try {
            existingProduct = await Product.find({}).skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 });


        } catch (error) {
            return res.status(400).json({ success, message: "cant do pagination" });
        }
        success = true;
        return res.status(200).json({ success, existingProduct });


    }
}
export const countProducts = async (req, res, next) => {
    let products;
    try {

        products = await Product.find().estimatedDocumentCount();

    } catch (error) {
        return next(error);
    }

    if (!products) {
        success = false;
        return res.status(400).json({ success, message: "no products found" })
    }
    success = true
    res.status(200).json({ success, message: "products count", totalProducts: products })
}