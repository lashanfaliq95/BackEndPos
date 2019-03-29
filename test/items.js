//During the test the env variable is set to test
process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let Items = require("../models/items");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();
let Users = require("../models/users");

chai.use(chaiHttp);

//now let's login the user before we run any tests
var authenticatedUser = chai.request.agent(server);

before(done => {
  const userCredentials = {
    username: "admin",
    password: "admin"
  };
  authenticatedUser
    .post("/users/createuser")
    .send(userCredentials)
    .end((err, res) => {
      if (!err) {
        authenticatedUser
          .post("/users/authenticate")
          .send(userCredentials)
          .end(function(err, response) {
            done();
          });
      }
     
    });
});
//Our parent block
describe("Items", () => {
  beforeEach(done => {
    //Before each test we empty the database
    Items.remove({}, err => {
      done();
    });
  });

  /*
   * Test the create user
   */
  describe("/POST create Item", () => {
    it("it should create an item", done => {
      const item = {
        name: "burger",
        price: 300,
        qtyonstock: 5
      };
      authenticatedUser
        .post("/items/createitem")
        .send(item)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("name").eql(item.name);
          res.body.should.have.property("price").eql(item.price);
          res.body.should.have.property("qtyonstock").eql(item.qtyonstock);
          done();
        });
    });
  });

  describe("/DELETE  item", () => {
    it("it should remove an item", done => {
      const item = new Items({
        name: "burger",
        price: 300,
        qtyonstock: 5
      });
      item.save((err, item) => {
       
        console.log(item);
        authenticatedUser
          .del("/items/removeitem/" + item._id)
          .end((err, res) => {
            console.log(err)
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("name").eql(item.name);
            res.body.should.have.property("price").eql(item.price);
            res.body.should.have.property("qtyonstock").eql(item.qtyonstock);
            done();
          });
      });
    });
  });
});
