const db = require('../db');
const item = require('./items');
const Schema = db.Schema;


const OrderSchema = new Schema({
    items: [{
        item: { type: item, required: true },
        orderamount: { type: Number, require=true }
    }],
    totalPrice: { type: Number, required=false },
    status: { type: String, required=true },
    createdBy: { type: Schema.Types.ObjectId, required: true }

})

const order = db.model('order', OrderSchema);
module.exports = order;