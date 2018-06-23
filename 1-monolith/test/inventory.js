//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Inventory = require('../app/models/inventory');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe('Inventory', () => {

  beforeEach((done) => { //Before each test we empty the database
    Inventory.remove({}, (err) => {
      done();
    });
  });

  /*
  * Test the /GET route
  */
  describe('/GET inventory', () => {
    it('it should GET all the inventory', (done) => {
      chai.request(server)
        .get('/v1/inventory')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  /*
  * Test the /POST route
  */
  describe('/POST inventory', () => {
    it('it should not POST a inventory without quantity field', (done) => {
      let inventory = {
        inventoryId: '4567'
      }
      chai.request(server)
        .post('/v1/inventory')
        .send(inventory)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('errors');
            res.body.errors.should.have.property('quantity');
            res.body.errors.quantity.should.have.property('kind').eql('required');
        done();
      });
    });

    it('it should POST a inventory with all fields', (done) => {
        let inventory = {
          productId: '4567',
          quantity: 10
        }
        chai.request(server)
          .post('/v1/inventory')
          .send(inventory)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message').eql('Inventory successfully added!');
              res.body.inventory.should.have.property('productId');
              res.body.inventory.should.have.property('quantity');
            done();
          });
      });
  });

  /*
  * Test the /GET/:id route
  */
  describe('/GET/:id inventory', () => {
    it('it should GET a inventory by the given id', (done) => {
      let inventory = new Inventory({
        productId: '4567',
        quantity: 10
      });
      inventory.save((err, inventory) => {
        chai.request(server)
        .get('/v1/inventory/' + inventory.id)
        .send(inventory)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('productId');
            res.body.should.have.property('quantity');
            res.body.should.have.property('_id').eql(inventory.id);
          done();
        });
      });
    });
  });

  describe('/PUT/:id inventory', () => {
      it('it should UPDATE a inventory given the id', (done) => {
        let inventory = new Inventory({
          productId: '4567',
          quantity: 10
        });
        inventory.save((err, res) => {
              chai.request(server)
              .put('/v1/inventory/' + inventory.id)
              .send({productId: '4568', quantity: 20})
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('Inventory updated!');
                  res.body.inventory.should.have.property('productId').eql('4568');
                  res.body.inventory.should.have.property('quantity').eql(20);
                done();
              });
          });
      });
  });

 /*
  * Test the /DELETE/:id route
  */
  describe('/DELETE/:id inventory', () => {
      it('it should DELETE a inventory given the id', (done) => {
        let inventory = new Inventory({
          productId: '4567',
          quantity: 10
        });
        inventory.save((err, res) => {
              chai.request(server)
              .delete('/v1/inventory/' + inventory.id)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('Inventory successfully deleted!');
                  res.body.inventory.should.have.property('ok').eql(1);
                  res.body.inventory.should.have.property('n').eql(1);
                done();
              });
          });
      });
  });

});
