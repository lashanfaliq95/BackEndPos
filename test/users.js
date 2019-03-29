// //During the test the env variable is set to test
// process.env.NODE_ENV = "test";

// let mongoose = require("mongoose");
// let Users = require("../models/users");
// const bcrypt = require("bcrypt");
// //Require the dev-dependencies
// let chai = require("chai");
// let chaiHttp = require("chai-http");
// let server = require("../app");
// let should = chai.should();

// chai.use(chaiHttp);
// //Our parent block
// describe("Users", () => {
//   beforeEach(done => {
//     //Before each test we empty the database
//     Users.remove({}, err => {
//       done();
//     });
//   });
//   /*
//    * Test the create user
//    */
//   describe("/POST create user", () => {
//     it("it should create an user", done => {
//       const user = {
//         username: "admin",
//         password: "admin"
//       };
//       chai
//         .request(server)
//         .post("/users/createuser")
//         .send(user)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a("object");
//           res.body.should.have.property("username").eql(user.username);
//           //password is encrypted with bcrypt so it has to decrypted before equalising
//           res.body.should.have.property("password");
//           done();
//         });
//     });
//   });

//   /*
//    * Test the authenticate user
//    */
//   describe("/POST create user", () => {
//     it("it should authenticate an user", done => {
//       const obj = {
//         username: "admin",
//         password: "admin"
//       };
//       const user = new Users(obj);
//       user.save((err, user) => {
//         chai
//           .request(server)
//           .post("/users/authenticate")
//           .send(obj)
//           .end((err, res) => {
//             res.should.have.status(200);
//             done();
//           });
//       });
//     });
//   });
// });
