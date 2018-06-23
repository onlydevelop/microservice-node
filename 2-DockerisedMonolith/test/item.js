//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Item = require('../app/models/item');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe('Items', () => {

  beforeEach((done) => { //Before each test we empty the database
    Item.remove({}, (err) => {
      done();
    });
  });

  /*
  * Test the /GET route
  */
  describe('/GET item', () => {
    it('it should GET all the items', (done) => {
      chai.request(server)
        .get('/v1/items')
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
  describe('/POST item', () => {
    it('it should not POST a item without orderId field', (done) => {
      let item = {
        productId: '3456',
        quantity: 10,
        total: 4990
      }
      chai.request(server)
        .post('/v1/items')
        .send(item)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('errors');
            res.body.errors.should.have.property('orderId');
            res.body.errors.orderId.should.have.property('kind').eql('required');
        done();
      });
    });

    it('it should POST a item with all fields', (done) => {
        let item = {
          orderId: '2345',
          productId: '3456',
          quantity: 10,
          total: 4990
        }
        chai.request(server)
          .post('/v1/items')
          .send(item)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message').eql('Item successfully added!');
              res.body.item.should.have.property('orderId');
              res.body.item.should.have.property('productId');
              res.body.item.should.have.property('quantity');
              res.body.item.should.have.property('total');
            done();
          });
      });
  });

  /*
  * Test the /GET/:id route
  */
  describe('/GET/:id item', () => {
    it('it should GET a item by the given id', (done) => {
      let item = new Item({
        orderId: '2345',
        productId: '3456',
        quantity: 10,
        total: 4990
      });
      item.save((err, item) => {
        chai.request(server)
        .get('/v1/items/' + item.id)
        .send(item)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('orderId');
            res.body.should.have.property('productId');
            res.body.should.have.property('quantity');
            res.body.should.have.property('total');
            res.body.should.have.property('_id').eql(item.id);
          done();
        });
      });
    });
  });

  describe('/PUT/:id item', () => {
      it('it should UPDATE a item given the id', (done) => {
        let item = new Item({
          orderId: '2345',
          productId: '3456',
          quantity: 10,
          total: 4990
        });
        item.save((err, res) => {
              chai.request(server)
              .put('/v1/items/' + item.id)
              .send({orderId: '2346', productId: '3457', quantity: 11, total: 5500})
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('Item updated!');
                  res.body.item.should.have.property('orderId').eql('2346');
                  res.body.item.should.have.property('productId').eql('3457');
                  res.body.item.should.have.property('quantity').eql(11);
                  res.body.item.should.have.property('total').eql(5500);
                done();
              });
          });
      });
  });

 /*
  * Test the /DELETE/:id route
  */
  describe('/DELETE/:id item', () => {
      it('it should DELETE a item given the id', (done) => {
        let item = new Item({
          orderId: '2345',
          productId: '3456',
          quantity: 10,
          total: 4990
        });
        item.save((err, res) => {
              chai.request(server)
              .delete('/v1/items/' + item.id)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('Item successfully deleted!');
                  res.body.item.should.have.property('ok').eql(1);
                  res.body.item.should.have.property('n').eql(1);
                done();
              });
          });
      });
  });

});
