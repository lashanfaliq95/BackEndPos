const mongoose = require('mongoose');
const item = require('./items');
const user=require('./users')
const Schema = mongoose.Schema;


const OrderSchema = new Schema({
    _id:{ type: Number, require=true,unique=true },
    items: [{
        item:  {
            type: mongoose.Schema.Types.Objectid,
            ref: 'item',
            required=true
        },
        orderamount: { type: Number, require=true }
    }],
    totalPrice: { type: Number, required=false },
    status: { type: String, required=true },
    createdby: {
        type: mongoose.Schema.Types.Objectid,
        ref: 'user',
        required=true
    }

})

const order = mongoose.model('order', OrderSchema);
module.exports = order;