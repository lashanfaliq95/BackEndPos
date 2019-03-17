const mongoose = require('mongoose');
const item = require('./items');
const Schema = mongoose.Schema;


const OrderSchema = new Schema({
    items: [{
        item: { type: item, required: true },
        orderamount: { type: Number, require=true }
    }],
    totalPrice: { type: Number, required=false },
    status: { type: String, required=true },
    createmongoosey: { type: Schema.Types.ObjectId, required: true }

})

const order = mongoose.model('order', OrderSchema);
module.exports = order;