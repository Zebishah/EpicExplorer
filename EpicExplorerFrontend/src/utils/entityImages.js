export const ENTITY_IMAGE_FALLBACKS = {
  transport: "/images/fallbacks/transport.jpg",
  tour: "/images/fallbacks/tour.jpg",
  hotel: "/images/fallbacks/hotel.jpg",
  room: "/images/fallbacks/room.jpg",
  blog: "/images/fallbacks/blog.jpg",
};

export const STATIC_IMAGE_OPTIONS = {
  transport: [
    ["BMW", "/images/transports/bmw.jpg"],
    ["SUV", "/images/transports/suv.jpg"],
    ["Big Coaster", "/images/transports/big-coaster.jpg"],
    ["Small Coaster", "/images/transports/small-coaster.jpg"],
    ["Hiace", "/images/transports/hiace.jpg"],
    ["Faisal Movers", "/images/transports/faisal-movers.jpg"],
    ["Bus", "/images/transports/bus.jpg"],
  ],
  tour: [
    ["Mountains", "/images/tours/mountains.jpg"],
    ["Adventure", "/images/tours/adventure.jpg"],
    ["Family", "/images/tours/family.jpg"],
    ["Honeymoon", "/images/tours/honeymoon.jpg"],
    ["Cultural", "/images/tours/cultural.jpg"],
    ["Waterfall", "/images/tours/waterfall.jpg"],
  ],
  hotel: [
    ["Luxury", "/images/hotels/luxury.jpg"],
    ["Resort", "/images/hotels/resort.jpg"],
    ["City hotel", "/images/hotels/city.jpg"],
    ["Standard", "/images/hotels/standard.jpg"],
  ],
  room: [
    ["Suite", "/images/rooms/suite.jpg"],
    ["Deluxe", "/images/rooms/deluxe.jpg"],
    ["Standard room", "/images/rooms/standard.jpg"],
  ],
  blog: [
    ["Travel", "/images/blogs/travel.jpg"],
    ["Adventure", "/images/blogs/adventure.jpg"],
    ["Destination", "/images/blogs/destination.jpg"],
  ],
};

const isUsableImage = (value) => {
  const image = String(value || "").trim();
  return image && image !== " " && !image.startsWith("data:");
};

export const getEntityImage = (value, type) =>
  isUsableImage(value) ? String(value).trim() : ENTITY_IMAGE_FALLBACKS[type];
