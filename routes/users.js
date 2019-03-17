var express = require('express');
var router = express.Router();
const users=require('../controllers/users.controllers.js');


/* GET users listing. */
router.get('/', users.findAll);

router.get('/userid',users.findOne);

router.get('/:username/:password',users.authenticate);

router.post('/createuser',users.createUser);


module.exports = router;
