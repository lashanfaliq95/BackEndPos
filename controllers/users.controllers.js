const user = require('../models/users');



// Retrieve and return all users from the database.
exports.findAll = (req, res) => {

};

// Find a single user with a userId
exports.findOne = (req, res) => {

};

// Authenticate a user with username and password
exports.authenticate = (req, res) => {

};

// Create a new user
exports.createUser = (req, res,next) => {


    if (req.body.username && req.body.password) {
        const newUser = new user(req.body);
        newUser.save()
            .then(data => {
                return res.redirect(302, '/ ')
            })
            .catch(err => {
                return next(err);
            });

    }

};
