var express = require('express');
var router = express.Router();
const orders=require('../controllers/orders.controllers');

/* Add order */
router.post('/createorder',orders.createOrder);

/* Remove order */
router.delete('/removeorder/:_id',orders.removeOrder);

/* Get order */
router.get('/getorder/:_id',orders.getOrder);

/* Update order */
router.put('/updateorder/:_id',orders.updateOrder);

/* Update items on order*/
router.put('/updateorderitems/:_id/:item_id',orders.updateItemsOnOrder);

module.exports = router;    