const order = require('../models/orders');
const mongoose = require('mongoose');
const item = require('./items.controllers');


// Create an order
exports.createOrder = (req, res, next) => {
    if (req.body.items && req.body.status && req.body.createdby) {
        const newOrder = new order(req.body);
        newOrder.save()
            .then(order => {
                return res.send(order)
            })
            .catch(err => {
                return next(err);
            });
    } else {
        return res.status(400).send({
            message: "cannot create order,please insert the required fields"
        });
    }

};

// Remove an order
exports.removeOrder = (req, res, next) => {
    if (mongoose.Types.ObjectId.isValid(req.params._id)) {
        order.findOneAndDelete({ _id: req.params._id })
            .then((order) => {
                if (!order) {
                    return res.status(404).send({
                        message: "order not found with id  " + req.params._id
                    });
                }
                return res.send(order);
            })
            .catch(err => {
                console.log(err);
                next(err);
            });
    }
    else {
        return res.status(400).send({
            message: "insert a correct order _id"
        });
    }

};


// Get an order
exports.getOrder = (req, res, next) => {
    if (mongoose.Types.ObjectId.isValid(req.params._id)) {
        order.findOne({ _id: req.params._id })
            .populate('items.item')
            .populate('createdby')
            .then((order) => {
                if (!order) {
                    return res.status(404).send({
                        message: "order not found with id  " + req.params._id
                    });
                }
                return res.send(order);
            })
            .catch(err => {
                console.log(err);
                next(err);
            });
    }
    else {
        return res.status(400).send({
            message: "insert a correct order _id"
        });
    }

};


// Update an order
exports.updateOrder = (req, res, next) => {
    if (mongoose.Types.ObjectId.isValid(req.params._id)) {
        order.findOneAndUpdate({ _id: req.params._id },
            { $set: { "status": req.body.status } })
            .then((order) => {
                if (!order) {
                    return res.status(404).send({
                        message: "order not found with id  " + req.params._id
                    });
                }
                return res.send(order);
            })
            .catch(err => {
                console.log(err);
                next(err);
            });
    }
    else {
        return res.status(400).send({
            message: "insert a correct order _id"
        });
    }

};

// Update an order
exports.updateItemsOnOrder = (req, res, next) => {
    if (mongoose.Types.ObjectId.isValid(req.params._id)) {
        order.findOne({ _id: req.params._id })
            .populate('items.item')
            .populate('createdby')
            .then((order) => {
                console.log('test');
                if (!order) {
                    return res.status(404).send({
                        message: "order not found with id  " + req.params._id
                    });
                }
                if (mongoose.Types.ObjectId.isValid(req.params.item_id)) {
                    console.log(order.items);
                    const items = order.items;
                    const value = parseInt(req.body.value);
                    //find the index of the item we need to change
                    index = items.findIndex(x => x.item._id == req.params.item_id);
                    console.log(items[index].item.qtyonstock);
                    let orderamount = items[index].orderamount;
                    let newqty;

                    if (value >= 0) {
                        if (items[index].item.qtyonstock < value) {
                            return res.status(400).send({
                                message: "no items on stock"
                            });
                        }

                         newqty = items[index].item.qtyonstock - value;
                        item.setItemQtyThroughOrder(items[index].item._id, newqty);
                        orderamount += value;

                    }
                    else {
                        if (items[index].orderamount < Math.abs(value)) {
                            return res.status(400).send({
                                message: "no items on order"
                            });
                        }
                         newqty = items[index].item.qtyonstock + Math.abs(value);
                        item.setItemQtyThroughOrder(items[index].item._id, newqty);
                        orderamount -= Math.abs(value);
                    }



                    console.log(orderamount);
                    order.items[index].item.qtyonstock=newqty;
                    order.items[index].orderamount = orderamount;
                    order.save();

                    return res.send(order);
                }
                else {
                    return res.status(400).send({
                        message: "insert a correct item _id"
                    });
                }

            })
            .catch(err => {
                console.log(err);
                next(err);
            });
    }
    else {
        return res.status(400).send({
            message: "insert a correct order _id"
        });
    }
};