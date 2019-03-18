var express = require('express');
var router = express.Router();
const items=require('../controllers/items.controllers');

/* Add item */
router.post('/createitem',items.createItem);

/* Remove item */
router.delete('/removeitem/:id',items.removeItem);

/* Get item */
router.get('/getitem/:id',items.getItem);

/* Update item */
router.put('/updateitem/:id',items.updateItemQty);

module.exports = router;
