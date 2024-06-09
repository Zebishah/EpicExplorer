import Room from "../Models/Room.js";
import Tour from "../Models/Tour.js";
import Transport from "../Models/Transport.js";
import UserFavrt from "../Models/UserFavrt.js";


export const addUserFavorite = async (req, res, next) => {
    let user = req.user;
    let id = req.body.id;
    let checkUserFavrt;
    try {
        checkUserFavrt = await UserFavrt.findOne({ userId: user.id, compId: id });
    } catch (error) {
        return next(error);
    }


    let tourCheckFavrt, transportCheckFavrt, hotelCheckFavrt, Favrt;
    tourCheckFavrt = await Tour.findOne({ _id: id });
    if (tourCheckFavrt) {
        Favrt = new UserFavrt({ compId: tourCheckFavrt.id, name: tourCheckFavrt.name, prices: tourCheckFavrt.price, description: tourCheckFavrt.description, image: tourCheckFavrt.image, userId: user.id })
        await Favrt.save();
        user.wishList.push(id);
        user.save();
        return res.status(200).json({ success: true, message: "here are your Favrt", Favrt: Favrt })
    }


    //check for hotel

    hotelCheckFavrt = await Room.findOne({ _id: id });

    if (hotelCheckFavrt) {
        Favrt = new UserFavrt({ compId: hotelCheckFavrt.id, name: hotelCheckFavrt.name, prices: hotelCheckFavrt.prices, description: hotelCheckFavrt.description, image: hotelCheckFavrt.image, userId: user.id })
        await Favrt.save();
        user.wishList.push(id);
        user.save();
        return res.status(200).json({ success: true, message: "here are your Favrt", Favrt: Favrt })
    }


    //check for transport
    transportCheckFavrt = await Transport.findOne({ _id: id });
    if (transportCheckFavrt) {
        Favrt = new UserFavrt({ compId: transportCheckFavrt.id, name: transportCheckFavrt.name, prices: transportCheckFavrt.prices, description: transportCheckFavrt.description, image: transportCheckFavrt.image, userId: user.id })
        await Favrt.save();
        user.wishList.push(id);
        user.save();
        return res.status(200).json({ success: true, message: "here are your Favrt", Favrt: Favrt })
    }
    if (!Favrt) {
        return res.status(400).json({ success: false, message: "that accommodation not found" })
    }


}

export const getUserFavorite = async (req, res, next) => {
    let user = req.user;
    let Favorites;
    try {
        Favorites = await UserFavrt.find({ userId: user.id });
    } catch (error) {
        return next(error);
    }

    if (!Favorites) {

        return res.status(400).json({ success: false, message: "no Favorites are here" })
    }

    return res.status(200).json({ success: true, message: "here are your all Favorites", Favorites: Favorites })
}

export const deleteUserFavorite = async (req, res, next) => {
    let user = req.user;
    let Favorites;
    try {
        Favorites = await UserFavrt.findOneAndDelete({ compId: id, userId: user.id });
    } catch (error) {
        return next(error);
    }

    if (!Favorites) {

        return res.status(400).json({ success: false, message: "no Favorites are here" })
    }
    user.wishList.pull(id);
    user.save();
    return res.status(200).json({ success: true, message: "here are your deleted Favorite", Favorites: Favorites })
}