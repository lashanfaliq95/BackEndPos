//During the test the env variable is set to test
process.env.NODE_ENV = "test";

const Items = require("../models/items");
const Users = require("../models/users");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();
chai.use(chaiHttp);

//Our parent block
describe("Items", () => {
  //create a agent to keep session state
  var authenticatedUser = chai.request.agent(server);
  const userCredentials = {
    username: "admin",
    password: "admin"
  };

  before(done => {
    //create an user and get session
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

  after(done => {
    //logout the session and remove the user
    authenticatedUser.post("/users/logout").end((err, res) => {
      if (!err) console.log("logged out");
    });

    Users.remove({}, err => {
      done();
    });
  });

  beforeEach(done => {
    //Before each test we empty the database
    Items.remove({}, err => {
      done();
    });
  });

  /*
   * Test the create item
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

  /*
   * Test the remove item
   */
  describe("/DELETE  item", () => {
    it("it should remove an item", done => {
      const item = new Items({
        name: "burger",
        price: 300,
        qtyonstock: 5
      });
      item.save((err, item) => {
        authenticatedUser
          .del("/items/removeitem/" + item._id)
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
  });

  /*
   * Test the get all items
   */
  describe("/GET  items", () => {
    it("it should get all items", done => {
      authenticatedUser.get("/items/getallitems").end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
    });
  });

  /*
   * Test the get item
   */
  describe("/GET  items", () => {
    it("it should get an item", done => {
      const item = new Items({
        name: "burger",
        price: 300,
        qtyonstock: 5
      });
      item.save((err, item) => {
        authenticatedUser.get("/items/getitem/" + item._id).end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
      });
    });
  });

  /*
   * Test the get item
   */
  describe("/PUT  to update item quntity on stock", () => {
    it("it should get an item", done => {
      const obj = {
        name: "burger",
        price: 300,
        qtyonstock: 5
      };
      const item = new Items(obj);
      const value = 5;
      item.save((err, item) => {
        authenticatedUser
          .put("/items/updateitem/" + item._id)
          .send({ value: 5 })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.a
              .property("qtyonstock")
              .eql(value + obj.qtyonstock);
            done();
          });
      });
    });
  });
});
