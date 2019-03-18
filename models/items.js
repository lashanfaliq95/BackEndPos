const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    _id:{
        type:Number,
        required:true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    qtyonstock: {
        type: Number,
        required: true
    }
});

const item = new Schema('item', ItemSchema);
module.exports = item;