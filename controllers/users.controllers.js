const user = require('../models/users');
const bcrypt = require('bcrypt');

// Authenticate a user with username and password
exports.authenticate = (req, res, next) => {
    if (req.body.username && req.body.password) {
        user.findOne({ username: req.body.username })
            .then(async (user) => {

                if (!user) {
                    return res.status(404).send({
                        message: "user not found with username " + req.body.username
                    });
                }
                const match = await bcrypt.compare(req.body.password, user.password);
                if (match) {
                    console.log('user authenticated');
                    res.send(user);
                }
            })
            .catch(err => {
                console.log(err);
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "user not found with username" + req.body.username
                    });
                }
                return res.status(500).send({
                    message: "user not found with username" + req.body.username
                });
            })

    }

};

// Create a new user
exports.createUser = (req, res, next) => {

    if (req.body.username && req.body.password) {
        const newUser = new user(req.body);
        newUser.save()
            .then(data => {
                return res.send(302, data)
            })
            .catch(err => {
                return next(err);
            });

    }

};
