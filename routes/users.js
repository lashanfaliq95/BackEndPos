var express = require('express');
var router = express.Router();
const users=require('../controllers/users.controllers.js');


/* Autheticate user */
router.post('/authenticate',users.authenticate);

/* Create user */
router.post('/createuser',users.createUser);


module.exports = router;
