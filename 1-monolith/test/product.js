//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Product = require('../app/models/product');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe('Products', () => {

  beforeEach((done) => { //Before each test we empty the database
    Product.remove({}, (err) => {
      done();
    });
  });

  /*
  * Test the /GET route
  */
  describe('/GET product', () => {
    it('it should GET all the products', (done) => {
      chai.request(server)
        .get('/v1/products')
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
  describe('/POST product', () => {
    it('it should not POST a product without price field', (done) => {
      let product = {
        title: 'Title',
        description: 'Description'
      }
      chai.request(server)
        .post('/v1/products')
        .send(product)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('errors');
            res.body.errors.should.have.property('price');
            res.body.errors.price.should.have.property('kind').eql('required');
        done();
      });
    });

    it('it should POST a product with all fields', (done) => {
        let product = {
          title: 'Title',
          description: 'Description',
          price: 199.99
        }
        chai.request(server)
          .post('/v1/products')
          .send(product)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message').eql('Product successfully added!');
              res.body.product.should.have.property('title');
              res.body.product.should.have.property('description');
              res.body.product.should.have.property('price');
            done();
          });
      });
  });

  /*
  * Test the /GET/:id route
  */
  describe('/GET/:id product', () => {
    it('it should GET a product by the given id', (done) => {
      let product = new Product({
        title: 'Title',
        description: 'Description',
        price: 199.99
      });
      product.save((err, product) => {
        chai.request(server)
        .get('/v1/products/' + product.id)
        .send(product)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('title');
            res.body.should.have.property('description');
            res.body.should.have.property('price');
            res.body.should.have.property('_id').eql(product.id);
          done();
        });
      });
    });
  });

  describe('/PUT/:id product', () => {
      it('it should UPDATE a product given the id', (done) => {
        let product = new Product({
          title: 'Title',
          description: 'Description',
          price: 199.99
        });
        product.save((err, res) => {
              chai.request(server)
              .put('/v1/products/' + product.id)
              .send({title: 'Title1', description: 'Description1', price: 299.99})
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('Product updated!');
                  res.body.product.should.have.property('title').eql('Title1');
                  res.body.product.should.have.property('description').eql('Description1');
                  res.body.product.should.have.property('price').eql(299.99);
                done();
              });
          });
      });
  });

 /*
  * Test the /DELETE/:id route
  */
  describe('/DELETE/:id product', () => {
      it('it should DELETE a product given the id', (done) => {
        let product = new Product({
          title: 'Title',
          description: 'Description',
          price: 199.99
        });
        product.save((err, res) => {
              chai.request(server)
              .delete('/v1/products/' + product.id)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('Product successfully deleted!');
                  res.body.product.should.have.property('ok').eql(1);
                  res.body.product.should.have.property('n').eql(1);
                done();
              });
          });
      });
  });

});
