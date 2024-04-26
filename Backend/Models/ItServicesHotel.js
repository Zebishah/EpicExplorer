import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let ItServicesHotelSchema = new Schema({
    roomId: {
        type: String,
        required: true
    },
    priceIncludes: [{
        type: String,
        required: true
    }],
    priceExcludes: [{
        type: String,
        required: true
    }],
    services: [{
        type: String,
        required: true

    }],
    completeInfo: [{
        attribute: {
            type: String,
            required: true
        },
        detail: {
            type: String,
            required: true
        }
    }]

});
export default mongoose.model('ItServicesHotel', ItServicesHotelSchema);