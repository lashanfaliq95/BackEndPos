const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const item = require('./items');
const user = require('./users');


const OrderSchema = new Schema({
    items: [{
        item: {
            type: Schema.Types.ObjectId,
            ref: 'item'
        },
        orderamount: { type: Number }
    }],
    status: { type: String },
    createdby: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }

})

const order = mongoose.model('order', OrderSchema);
module.exports = order;