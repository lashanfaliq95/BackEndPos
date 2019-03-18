var express = require('express');
var router = express.Router();
const items=require('../controllers/items.controllers.js');

/* Add item */
router.post('/additem',items.addItem);

/* Remove item */
router.post('/removeitem',items.removeItem);

/* Get item */
router.post('/getitem',items.getItem);

/* Update item */
router.post('/updateitem',items.updateItem);

module.exports = router;
