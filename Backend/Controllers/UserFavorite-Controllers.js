import Room from "../Models/Room";
import Tour from "../Models/Tour";
import Transport from "../Models/Transport";
import UserFavrt from "../Models/UserFavrt";


export const addUserFavorite = async (req, res, next) => {
    let user = req.user;
    let id = req.params.id;
    let checkUserFavrt;
    try {
        checkUserFavrt = await UserFavrt.findOne({ userId: user.id, compId: id });
    } catch (error) {
        return next(error);
    }

    if (checkUserFavrt) {
        success = false;
        return res.status(400).json({ success, message: "This User favorites already exists" })
    }

    let checkFavrt, Favrt;
    try {
        checkFavrt = await Tour.findOne({ id: id });
    } catch (error) {
        return next(error);
    }

    if (!checkFavrt) {
        success = false;
        return res.status(400).json({ success, message: "This item not exists in favorites" })
    }
    else {
        Favrt = new UserFavrt({ compId: checkFavrt.id, name: checkFavrt.name, price: checkFavrt.price, description: checkFavrt.description, image: checkFavrt.image, available: checkFavrt.available, userName: user.name, userId: user.id })
        await Favrt.save();
    }
    //check for hotel
    try {
        checkFavrt = await Room.findOne({ id: id });
    } catch (error) {
        return next(error);
    }

    if (!checkFavrt) {
        success = false;
        return res.status(400).json({ success, message: "This item not exists in favorites" })
    }
    else {
        Favrt = new UserFavrt({ compId: checkFavrt.id, name: checkFavrt.name, price: checkFavrt.prices, description: checkFavrt.description, image: checkFavrt.image, available: checkFavrt.available, userName: user.name, userId: user.id })
        await Favrt.save();
    }
    //check for transport
    try {
        checkFavrt = await Transport.findOne({ id: id });
    } catch (error) {
        return next(error);
    }

    if (!checkFavrt) {
        success = false;
        return res.status(400).json({ success, message: "This item not exists in favorites" })
    }
    else {
        Favrt = new UserFavrt({ compId: checkFavrt.id, name: checkFavrt.name, price: checkFavrt.prices, description: checkFavrt.description, image: checkFavrt.image, available: checkFavrt.available, userName: user.name, userId: user.id })
        await Favrt.save();
    }
    user.wishList.push(compId);
    user.save();
    return res.status(200).json({ success: true, message: "here are your Favrt", Favrt: Favrt })
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
        success = false;
        return res.status(400).json({ success, message: "no Favorites are here" })
    }

    success = true;
    return res.status(200).json({ message: "here are your all Favorites", Favorites: Favorites })
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
        success = false;
        return res.status(400).json({ success, message: "no Favorites are here" })
    }
    user.wishList.pull(compId);
    user.save();
    return res.status(200).json({ success: true, message: "here are your deleted Favorite", Favorites: Favorites })
}