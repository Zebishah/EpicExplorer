import "dotenv/config";
import mongoose from "mongoose";
import Tour from "./Models/Tour.js";
import Hotels from "./Models/Hotels.js";
import Transport from "./Models/Transport.js";
import Room from "./Models/Room.js";
import Blog from "./Models/Blogs.js";

const catalogs = {
  transport: ["/images/transports/bmw.jpg", "/images/transports/suv.jpg", "/images/transports/big-coaster.jpg", "/images/transports/small-coaster.jpg", "/images/transports/hiace.jpg", "/images/transports/faisal-movers.jpg", "/images/transports/bus.jpg"],
  tour: ["/images/tours/mountains.jpg", "/images/tours/adventure.jpg", "/images/tours/family.jpg", "/images/tours/honeymoon.jpg", "/images/tours/cultural.jpg", "/images/tours/waterfall.jpg"],
  hotel: ["/images/hotels/luxury.jpg", "/images/hotels/resort.jpg", "/images/hotels/city.jpg", "/images/hotels/standard.jpg"],
  room: ["/images/rooms/suite.jpg", "/images/rooms/deluxe.jpg", "/images/rooms/standard.jpg"],
  blog: ["/images/blogs/travel.jpg", "/images/blogs/adventure.jpg", "/images/blogs/destination.jpg"],
};

const oldPlaceholderPattern = /data:image|placeholder|dummy|pagedone\.io|r-nolan|jed-villejo|gregory-dalleau|marc-zimmer|full-shot-man|vecteezy|unsplash\.com/i;
const normalize = (value) => String(value || "").trim().toLowerCase();

const stableIndex = (record, type) => {
  const text = normalize(`${record._id}-${record.name || record.carName || record.hotelName || ""}`);
  return [...text].reduce((total, character) => total + character.charCodeAt(0), 0) % catalogs[type].length;
};

const chooseImage = (record, type) => {
  const text = normalize(`${record.name || ""} ${record.carName || ""} ${record.hotelName || ""} ${record.type || ""} ${record.parentCategory || ""}`);
  if (type === "transport") {
    if (text.includes("bmw")) return catalogs.transport[0];
    if (text.includes("suv")) return catalogs.transport[1];
    if (text.includes("big") && text.includes("coaster")) return catalogs.transport[2];
    if (text.includes("small") && text.includes("coaster")) return catalogs.transport[3];
    if (text.includes("hiace")) return catalogs.transport[4];
    if (text.includes("faisal") || text.includes("mover")) return catalogs.transport[5];
  }
  if (type === "tour") {
    if (text.includes("honeymoon")) return catalogs.tour[3];
    if (text.includes("family")) return catalogs.tour[2];
    if (text.includes("adventure")) return catalogs.tour[1];
    if (text.includes("cultur")) return catalogs.tour[4];
    if (text.includes("waterfall")) return catalogs.tour[5];
    if (text.includes("mountain")) return catalogs.tour[0];
  }
  if (type === "hotel") {
    if (text.includes("lux")) return catalogs.hotel[0];
    if (text.includes("resort")) return catalogs.hotel[1];
    if (text.includes("city")) return catalogs.hotel[2];
  }
  if (type === "room") {
    if (text.includes("suite")) return catalogs.room[0];
    if (text.includes("deluxe")) return catalogs.room[1];
  }
  if (type === "blog") {
    if (text.includes("adventure")) return catalogs.blog[1];
    if (text.includes("destination")) return catalogs.blog[2];
  }
  return catalogs[type][stableIndex(record, type)];
};

const needsMigration = (value) => !normalize(value) || oldPlaceholderPattern.test(String(value));

async function migrateCollection(Model, type, field) {
  const records = await Model.find({}, { [field]: 1, name: 1, carName: 1, hotelName: 1, type: 1, parentCategory: 1 }).lean();
  let updated = 0;
  for (const record of records) {
    if (!needsMigration(record[field])) continue;
    await Model.updateOne({ _id: record._id }, { $set: { [field]: chooseImage(record, type) } });
    updated += 1;
  }
  return { scanned: records.length, updated, skipped: records.length - updated };
}

try {
  if (!process.env.MONGOURI) throw new Error("MONGOURI is required. Add it to Backend/.env before running the migration.");
  await mongoose.connect(process.env.MONGOURI);
  const results = {
    transports: await migrateCollection(Transport, "transport", "image"),
    tours: await migrateCollection(Tour, "tour", "image"),
    hotels: await migrateCollection(Hotels, "hotel", "image"),
    rooms: await migrateCollection(Room, "room", "image"),
    blogs: await migrateCollection(Blog, "blog", "pic"),
  };
  console.log(JSON.stringify(results, null, 2));
} finally {
  await mongoose.disconnect();
}
