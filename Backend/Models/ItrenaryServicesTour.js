import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let ItrenaryServicesTourSchema = new Schema({
    priceIncludes: [{
        type: String,
        required: true
    }],
    priceExcludes: [{
        type: String,
        required: true
    }],
    activities: [{
        type: String,
        required: true

    }],
    daysServices: [{
        day: {
            type: String,
            required: true
        },
        services: [{
            type: String,
            required: true
        }]
    }]

});
export default mongoose.model('ItrenaryServicesTour', ItrenaryServicesTourSchema);