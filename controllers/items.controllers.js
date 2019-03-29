const item = require("../models/items");

// Create an item
exports.createItem = (req, res, next) => {
  if (req.body.name && req.body.price && req.body.qtyonstock) {
    const newItem = new item(req.body);
    newItem
      .save()
      .then(item => {
        return res.status(200).send(item);
      })
      .catch(err => {
        next(err);
      });
  } else {
    return res.status(404).send({
      message: "cannot create item,please insert the required fields"
    });
  }
};

//get all items
exports.getAllItems = (req, res, next) => {
  item
    .find()
    .then(item => {
      return res.status(200).send(item);
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
};

// Get the item
exports.getItem = (req, res, next) => {
  if (req.params.id) {
    item
      .findOne({ _id: req.params.id })
      .then(item => {
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
  } else {
    return res.status(400).send({
      message: "insert an order _id"
    });
  }
};

// Remove an item
exports.removeItem = (req, res, next) => {
  if (req.params.id) {
    item
      .findOneAndDelete({ _id: req.params.id })
      .then(item => {
        if (!item) {
          return res.status(404).send({
            message: "item not found with id  " + req.params.id
          });
        }
        return res.status(200).send(item);
      })
      .catch(err => {
        if (err.kind === "Objectid") {
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
  if (req.params.id) {
    item
      .findOneAndUpdate(
        { _id: req.params.id },
        { $inc: { qtyonstock: req.body.value } }
      )
      .then(item => {
        if (!item) {
          return res.status(404).send({
            message: "item not found with id  " + req.body.id
          });
        }
        return res.send(item);
      })
      .catch(err => {
        console.log(err);
        if (err.kind === "ObjectId") {
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

// update an items quantity on stock
exports.setItemQtyThroughOrder = (item_id, newQty) => {
  item
    .findOneAndUpdate({ _id: item_id }, { $set: { qtyonstock: newQty } })
    .then(item => {
      console.log(item);
    })
    .catch(err => {
      console.log(err);
    });
};
