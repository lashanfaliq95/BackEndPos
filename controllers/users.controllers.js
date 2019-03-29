const user = require("../models/users");
const bcrypt = require("bcrypt");

// Authenticate a user with username and password
exports.authenticate = (req, res, next) => {
  if (req.body.username && req.body.password) {
    user
      .findOne({ username: req.body.username })
      .then(async user => {
        if (!user) {
          return res.status(404).send({
            message: "user not found with username " + req.body.username
          });
        }
        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
          req.session.regenerate(function(err) {
            req.session.user = user;
            req.user = user;
            res.status(200).send(user);
          });
        } else {
          res.status(204).send({
            message: "username does not match password"
          });
        }
      })
      .catch(err => {
        console.log(err);
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "user not found with username" + req.body.username
          });
        }
        return res.status(500).send({
          message: "user not found with username" + req.body.username
        });
      });
  }
};

// Create a new user
exports.createUser = (req, res, next) => {
  if (req.body.username && req.body.password) {
    const newUser = new user(req.body);
    newUser
      .save()
      .then(data => {
        return res.send(200, data);
      })
      .catch(err => {
        return next(err);
      });
  }
};

// Create a new user
exports.logout = (req, res, next) => {
  console.log("test");
  //invalidate the session
  req.session.destroy();
  return res.status(200).send({
    message: "user session successfully deleted"
  });
};
