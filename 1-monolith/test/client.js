//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Client = require('../app/models/Client');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe('Clients', () => {

  beforeEach((done) => { //Before each test we empty the database
    Client.remove({}, (err) => {
      done();
    });
  });

  /*
  * Test the /GET route
  */
  describe('/GET client', () => {
    it('it should GET all the clients', (done) => {
      chai.request(server)
        .get('/v1/clients')
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
  describe('/POST client', () => {
    it('it should not POST a client without address field', (done) => {
      let client = {
        name: "Jon Doe",
        login: "jdoe",
        password: "pass"
      }
      chai.request(server)
        .post('/v1/clients')
        .send(client)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('errors');
            res.body.errors.should.have.property('address');
            res.body.errors.address.should.have.property('kind').eql('required');
        done();
      });
    });

    it('it should POST a client with all fields', (done) => {
      let client = {
          name: "Jon Doe",
          login: "jdoe",
          password: "pass",
          address: "21 Baker Street"
        }
        chai.request(server)
          .post('/v1/clients')
          .send(client)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message').eql('Client successfully added!');
              res.body.client.should.have.property('name');
              res.body.client.should.have.property('login');
              res.body.client.should.have.property('password');
              res.body.client.should.have.property('address');
            done();
          });
      });
  });

  /*
  * Test the /GET/:id route
  */
  describe('/GET/:id client', () => {
    it('it should GET a client by the given id', (done) => {
      let client = new Client({
        name: "Jon Doe",
        login: "jdoe",
        password: "pass",
        address: "21 Baker Street"
      });
      client.save((err, client) => {
        chai.request(server)
        .get('/v1/clients/' + client.id)
        .send(client)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('login');
            res.body.should.have.property('password');
            res.body.should.have.property('address');
            res.body.should.have.property('_id').eql(client.id);
          done();
        });
      });
    });
  });

  describe('/PUT/:id client', () => {
      it('it should UPDATE a client given the id', (done) => {
        let client = new Client({
          name: "Jon Doe",
          login: "jdoe",
          password: "pass",
          address: "21 Baker Street"
        });
        client.save((err, res) => {
              chai.request(server)
              .put('/v1/clients/' + client.id)
              .send({name: "John Doe", login: "john", password: 'mypass', address: "221 Baker Street"})
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('Client updated!');
                  res.body.client.should.have.property('name').eql("John Doe");
                  res.body.client.should.have.property('login').eql("john");
                  res.body.client.should.have.property('password').eql("mypass");
                  res.body.client.should.have.property('address').eql("221 Baker Street");
                done();
              });
          });
      });
  });

 /*
  * Test the /DELETE/:id route
  */
  describe('/DELETE/:id client', () => {
      it('it should DELETE a client given the id', (done) => {
        let client = new Client({
          name: "Jon Doe",
          login: "jdoe",
          password: "pass",
          address: "21 Baker Street"
        });
        client.save((err, res) => {
              chai.request(server)
              .delete('/v1/clients/' + client.id)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('Client successfully deleted!');
                  res.body.client.should.have.property('ok').eql(1);
                  res.body.client.should.have.property('n').eql(1);
                done();
              });
          });
      });
  });

});
