import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let ItrenaryServicesTransportSchema = new Schema({
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
            type: string,
            required: true
        },
        detail: {
            type: String,
            required: true
        }
    }]

});
export default mongoose.model('ItrenaryServicesTransport', ItrenaryServicesTransportSchema);