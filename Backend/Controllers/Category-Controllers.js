import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import Categorie from '../Models/Categorie.js';
import Tour from '../Models/Tour.js';
let success = null;

export const createCategory = async (req, res, next) => {

    let { name, pic, description, tours } = req.body;
    //checking if signup credentials are empty or not 
    if ((name.trim() === "" || pic.trim() === "" || description === "")) {
        return res.status(400).json({ success: false, message: "enter ur credentials first" });
    }

    let existingCategory;
    existingCategory = await Categorie.findOne({ name });
    if (existingCategory) {
        return res.status(400).json({ success: false, message: "User already exists" });
    }
    //making hashing account

    let category;
    try {
        category = new Categorie({ name, pic, description, tours })
        category = await category.save();
    } catch (error) {
        return next(error);
    }

    if (!category) {
        return res.status(400).json({ success: false, message: "Category not created" });
    }
    return res.status(200).json({ success: true, message: "category created successfully", category });
};

export const showCategoryTours = async (req, res, next) => {

    let { name } = req.body;
    let existingCategory;
    try {

        existingCategory = await Categorie.findOne({ name });

    } catch (error) {
        return next(error)
    }
    if (!existingCategory) {
        return res.status(400).json({ success: false, message: "category not exists" });
    }
    let tour;
    try {
        tour = await Tour.find({ parentCategory: existingCategory.id })

    } catch (error) {
        return next(error);
    }

    if (!tour) {
        return res.status(400).json({ success: false, message: "tour not created" });
    }
    return res.status(200).json({ success: true, message: "here is ur category tours", tour });
};