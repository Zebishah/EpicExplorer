import NotificationsUser from "../Models/NotificationsUser.js";
import Room from "../Models/Room.js";
import Tour from "../Models/Tour.js";
import Transport from "../Models/Transport.js";
import UserFavrt from "../Models/UserFavrt.js";
import notifyUsers from '../Utils/NotifyUser.js';

export const addUserFavorite = async (req, res, next) => {
    let user = req.user;
    let id = req.body.id;
    let checkUserFavrt;
    try {
        checkUserFavrt = await UserFavrt.findOne({ userId: user.id, compId: id });
    } catch (error) {
        return next(error);
    }
    let date = new Date();

    let tourCheckFavrt, transportCheckFavrt, hotelCheckFavrt, Favrt;
    tourCheckFavrt = await Tour.findOne({ _id: id });
    if (tourCheckFavrt) {
        Favrt = new UserFavrt({ compId: tourCheckFavrt.id, accommodationName: "Tour", name: tourCheckFavrt.name, prices: tourCheckFavrt.price, description: tourCheckFavrt.description, image: tourCheckFavrt.image, userId: user.id })
        await Favrt.save();
        user.wishList.push(id);
        user.save();


        let data = {
            type: 'Tour Favorite',
            message: `${user.userName} ${tourCheckFavrt.name} Tour Added To Your Favorite `,
            date: date,
            title: "Tour Added to Favorites"

        };

        notifyUsers(data);
        let notificationUser = new NotificationsUser({ user: user.userName, broadCast: "no", accommodationName: "Tour Added to Favorites", Category: "Tour Favorite", message: `${user.userName} ${tourCheckFavrt.name} Tour Added To Your Favorite` });
        await notificationUser.save();
        return res.status(200).json({ success: true, message: "here are your Favrt", Favrt: Favrt })
    }


    //check for hotel

    hotelCheckFavrt = await Room.findOne({ _id: id });

    if (hotelCheckFavrt) {
        Favrt = new UserFavrt({ compId: hotelCheckFavrt.id, accommodationName: "Hotel", name: hotelCheckFavrt.name, prices: hotelCheckFavrt.prices, description: hotelCheckFavrt.description, image: hotelCheckFavrt.image, userId: user.id })
        await Favrt.save();
        user.wishList.push(id);
        user.save();

        let data = {
            type: 'Hotel Favorite',
            message: `${user.userName} ${hotelCheckFavrt.name} Hotel Added To Your Favorite `,
            date: date,
            title: "Hotel Added to Favorites"

        };

        notifyUsers(data);
        let notificationUser = new NotificationsUser({ user: user.userName, broadCast: "no", accommodationName: "Hotel Added to Favorites", Category: "Hotel Favorite", message: `${user.userName} ${hotelCheckFavrt.name} Hotel Added To Your Favorite` });
        await notificationUser.save();
        return res.status(200).json({ success: true, message: "here are your Favrt", Favrt: Favrt })
    }


    //check for transport
    transportCheckFavrt = await Transport.findOne({ _id: id });
    if (transportCheckFavrt) {
        Favrt = new UserFavrt({ compId: transportCheckFavrt.id, accommodationName: "Transport", name: transportCheckFavrt.name, prices: transportCheckFavrt.prices, description: transportCheckFavrt.description, image: transportCheckFavrt.image, userId: user.id })
        await Favrt.save();
        user.wishList.push(id);
        user.save();

        let data = {
            type: 'Transport Favorite',
            message: `${user.userName} ${transportCheckFavrt.name} Transport Added To Your Favorite `,
            date: date,
            title: "Transport Added to Favorites"

        };

        notifyUsers(data);
        let notificationUser = new NotificationsUser({ user: user.userName, broadCast: "no", accommodationName: "Transport Added to Favorites", Category: "Transport Favorite", message: `${user.userName} ${transportCheckFavrt.name} Transport Added To Your Favorite` });
        await notificationUser.save();
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
    let id = req.body.id;
    let date = new Date();
    let Favorites;
    try {
        Favorites = await UserFavrt.findOneAndDelete({ compId: id, userId: user.id });
        user.wishList.pull(id);

    } catch (error) {
        return next(error);
    }

    let data = {
        type: '${Favorites.accommodationName} Favorite',
        message: `${user.userName} ${Favorites.name} Added To Your Favorite`,
        date: date,
        title: `${Favorites.name} Favorite Deleted`

    };

    notifyUsers(data);
    let notificationUser = new NotificationsUser({ user: user.userName, broadCast: "no", accommodationName: `${Favorites.name} Favorite Deleted`, Category: `${Favorites.accommodationName} Favorite`, message: `${user.userName} ${Favorites.name} Added To Your Favorite` });
    await notificationUser.save();
    return res.status(200).json({ success: true, message: "here are your deleted Favorite", Favorites: Favorites })
}