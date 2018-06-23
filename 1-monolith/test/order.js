//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Order = require('../app/models/order');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe('Orders', () => {

  beforeEach((done) => { //Before each test we empty the database
    Order.remove({}, (err) => {
      done();
    });
  });

  /*
  * Test the /GET route
  */
  describe('/GET order', () => {
    it('it should GET all the orders', (done) => {
      chai.request(server)
        .get('/v1/orders')
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
  describe('/POST order', () => {
    it('it should not POST a order without orderId field', (done) => {
      let order = {
        shipped: false,
        purchaseDate: new Date()
      }
      chai.request(server)
        .post('/v1/orders')
        .send(order)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('errors');
            res.body.errors.should.have.property('orderId');
            res.body.errors.orderId.should.have.property('kind').eql('required');
        done();
      });
    });

    it('it should POST a order with all fields', (done) => {
      let order = {
          shipped: false,
          purchaseDate: new Date(),
          orderId: '1234'
        }
        chai.request(server)
          .post('/v1/orders')
          .send(order)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message').eql('Order successfully added!');
              res.body.order.should.have.property('shipped');
              res.body.order.should.have.property('purchaseDate');
              res.body.order.should.have.property('orderId');
            done();
          });
      });
  });

  /*
  * Test the /GET/:id route
  */
  describe('/GET/:id order', () => {
    it('it should GET a order by the given id', (done) => {
      let order = new Order({
        shipped: false,
        purchaseDate: new Date(),
        orderId: '1234'
      });
      order.save((err, order) => {
        chai.request(server)
        .get('/v1/orders/' + order.id)
        .send(order)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('shipped');
            res.body.should.have.property('purchaseDate');
            res.body.should.have.property('orderId');
            res.body.should.have.property('_id').eql(order.id);
          done();
        });
      });
    });
  });

  describe('/PUT/:id order', () => {
      it('it should UPDATE a order given the id', (done) => {
        let purchaseDate = '2018-06-07T10:03:59.359Z';
        let order = new Order({
          shipped: false,
          purchaseDate: purchaseDate,
          orderId: '1234'
        });
        order.save((err, res) => {
              chai.request(server)
              .put('/v1/orders/' + order.id)
              .send({shipped: true, purchaseDate: purchaseDate, orderId: '1235'})
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('Order updated!');
                  res.body.order.should.have.property('shipped').eql(true);
                  res.body.order.should.have.property('purchaseDate').eql(purchaseDate);
                  res.body.order.should.have.property('orderId').eql('1235');
                done();
              });
          });
      });
  });

 /*
  * Test the /DELETE/:id route
  */
  describe('/DELETE/:id order', () => {
      it('it should DELETE a order given the id', (done) => {
        let order = new Order({
          shipped: false,
          purchaseDate: new Date(),
          orderId: '1234'
        });
        order.save((err, res) => {
              chai.request(server)
              .delete('/v1/orders/' + order.id)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('Order successfully deleted!');
                  res.body.order.should.have.property('ok').eql(1);
                  res.body.order.should.have.property('n').eql(1);
                done();
              });
          });
      });
  });

});
