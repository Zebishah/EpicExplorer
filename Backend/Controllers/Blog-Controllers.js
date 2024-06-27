import dotenv from 'dotenv';
import express, { response } from 'express';
import Categorie from '../Models/Categorie.js';
import NotificationsAdmin from '../Models/NotificationsAdmin.js';
import NotificationsUser from '../Models/NotificationsUser.js';
import Blogs from '../Models/Blogs.js';
import notifyUsers from '../Utils/NotifyUser.js';
import Tour from '../Models/Tour.js';
const app = express();
dotenv.config();

let success = null;


export const addBlog = async (req, res, next) => {


    let { name, AccommodationId, type, pic, words, category } = req.body;

    let existingBlog;
    try {
        existingBlog = await Blogs.findOne({ name: name });

    } catch (error) {
        return next(error);
    }
    if (existingBlog) {
        return res.status(400).json({ success: false, message: "blog already existed " });
    }
    let blog;
    try {

        blog = new Blogs({ name, AccommodationId, type, pic, words, category });
        blog = await blog.save();
    } catch (error) {
        return next(error);
    }


    let date = new Date();

    let notificationAdmin = new NotificationsAdmin({ accommodationName: "Blog Added Successfully", Category: "Blog Added", message: `One Blog ${blog.name} is Added from our site`, date });
    await notificationAdmin.save();

    let data = {
        type: 'Blog Added',
        message: `${blog.name} Blog is added Successfully`,
        date: date,
        title: "Blog Added Successfully"

    };

    notifyUsers(data);
    let notificationUser = new NotificationsUser({ user: "no", broadCast: "yes", accommodationName: "Blog Added Successfully", Category: "Blog Added", message: `${blog.name} Blog is added Successfully` });
    await notificationUser.save();
    return res.status(200).json({ success: true, message: "New blog is created", blog: blog });


};
export const getBlogs = async (req, res, next) => {

    let blogs;
    try {
        blogs = await Blogs.find();
    } catch (error) {
        return next(error);
    }

    if (!blogs) {
        success = false;
        return res.status(400).json({ success, message: "no blogs found in database" })
    }

    return res.status(200).json({ success: true, message: "here are your all blogs", blogs: blogs })
}
export const getTourBlogs = async (req, res, next) => {
    let id = req.body.id
    let tour;
    try {
        tour = await Tour.findById(id);
    } catch (error) {
        return next(error);
    }

    if (!tour) {
        success = false;
        return res.status(400).json({ success, message: "no toursfound in database" })
    }
    let blogs;
    try {
        blogs = await Blogs.find({ type: tour.type });
    } catch (error) {
        return next(error);
    }
    console.log(blogs)
    return res.status(200).json({ success: true, message: "here are your all blogs", blogs: blogs })
}
export const deleteBlog = async (req, res, next) => {
    let id = req.params.id;

    try {
        let blog = await Blogs.findByIdAndDelete(id);

        if (!blog) {
            return res.status(400).json({ success: false, message: "blog not found for deletion" });
        }

        let date = new Date();
        let notificationAdmin = new NotificationsAdmin({ accommodationName: blog.name, Category: "blog deleted", message: `blog ${blog.name} is deleted from our site`, date: date });
        await notificationAdmin.save();


        let data = {
            type: 'Blog Deleted',
            message: `${blog.name} Blog is Deleted Successfully`,
            date: date,
            title: "Blog Deleted Successfully"

        };

        notifyUsers(data);
        let notificationUser = new NotificationsUser({ user: "no", broadCast: "yes", accommodationName: "Blog Deleted Successfully", Category: "Blog Deleted", message: `${blog.name} Blog is Deleted Successfully` });
        await notificationUser.save();

        return res.status(200).json({ success: true, message: "blog deleted successfully", deletedBlog: blog });
    } catch (error) {
        console.error('Error deleting blog:', error);
        return res.status(500).json({ success: false, message: "Error deleting blog", error: error.message });
    }
};


export const updateBlog = async (req, res, next) => {
    let id = req.params.id;
    const { name, parentCategory, type, pic, words, newImage } = req.body;

    let blog;
    try {
        blog = await Blogs.findById(id);
    } catch (error) {
        return next(error);
    }

    if (!blog) {
        return res.status(400).json({ success: false, message: "blog not existed" });
    }

    // Update blog information
    blog.name = name || blog.name;
    blog.parentCategory = parentCategory || blog.parentCategory;
    blog.type = type || blog.type;
    blog.pic = pic || blog.pic;
    blog.words = words || blog.words;

    if (newImage) {
        blog.gallery.push(newImage);
    }
    await blog.save();
    let date = new Date();
    let notificationAdmin = new NotificationsAdmin({ accommodationName: blog.name, Category: "blog is updated", message: `one blog ${blog.name} information is updated in our site`, date: date })
    await notificationAdmin.save();

    return res.status(200).json({ success: true, message: 'blog updated successfully', blog: blog });


}