const item = require('../models/items');


// Create an item
exports.createItem = (req, res, next) => {
    if (req.body.id && req.body.name && req.body.price && req.body.qtyonstock) {
        const newItem = new item(req.body);
        newItem.save()
            .then(item => {
                return res.send(item)
            })
            .catch(err => {
                return next(err);
            });
    }else{
    return res.status(400).send({
        message: "cannot create item,please insert the required fields"
    });
    }
};


// Get the item
exports.getItem = (req, res, next) => {
  
    if (req.params.id) {
        
        item.findOne({ id: req.params.id })
            .then((item) => {
                if (!item) {
                    return res.status(404).send({
                        message: "item not found with id  " + req.params.id
                    });
                }
                return res.send(item);
            })
            .catch(err => {
                console.log(err);
                next(err);
            });
    }

};

// Remove an item
exports.removeItem = (req, res, next) => {
    console.log(req.params.id);
    if (req.params.id) {
        item.findOneAndDelete({ id: req.params.id })
            .then((item) => {
                if (!item) {
                    return res.status(404).send({
                        message: "item not found with id  " + req.params.id
                    });
                }
                return res.send(item);
            })
            .catch((err) => {
                if (err.kind === 'Objectid') {
                    return res.status(404).send({
                        message: "item not found with itemid" + req.params.id
                    });
                }
                return res.status(500).send({
                    message: "user not found with username" + req.params.id
                });
            });
    }

};

// update an items quantity on stock
exports.updateItemQty = (req, res, next) => {
    console.log(req.params.id);
    console.log(req.body);
    if (req.params.id ) {
        item.findOneAndUpdate({ id: req.params.id },
            { $inc: { "qtyonstock": req.body.value } })
            .then((item)=>{
                if (!item) {
                    return res.status(404).send({
                        message: "item not found with id  " + req.body.id
                    });
                }
                return res.send(item);

            })
            .catch((err)=>{
                console.log(err);
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "item not found with itemid" + req.body.id
                    });
                }
                return res.status(500).send({
                    message: "user not found with username" + req.body.id
                });
            });
    }

};

