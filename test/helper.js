// //During the test the env variable is set to test
// process.env.NODE_ENV = "test";
// global.assert = require('assert');


// const Items = require("../models/items");
// const Users = require("../models/users");

// //Require the dev-dependencies
// let chai = require("chai");
// let chaiHttp = require("chai-http");
// let server = require("../app");
// let should = chai.should();
// chai.use(chaiHttp);

// //create a agent to keep session state
// var authenticatedUser = chai.request.agent(server);
// const userCredentials = {
//   username: "admin",
//   password: "admin"
// };

// before(done => {
//   //create an user and get session
//   authenticatedUser
//     .post("/users/createuser")
//     .send(userCredentials)
//     .end((err, res) => {
//       if (!err) {
//         authenticatedUser
//           .post("/users/authenticate")
//           .send(userCredentials)
//           .end(function(err, response) {
//             done();
//           });
//       }
//     });
// });

// after(done => {
//   //logout the session and remove the user
//   authenticatedUser.post("/users/logout").end((err, res) => {
//     if (!err) console.log("logged out");
//   });

//   Users.remove({}, err => {
//     done();
//   });
// });
