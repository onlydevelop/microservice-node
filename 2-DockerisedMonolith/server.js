'use strict';

const express = require('express');
const app = express();
const router = express.Router();
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let port = process.env.PORT || 3000;

let client = require('./app/routes/client');
let order = require('./app/routes/order');
let product = require('./app/routes/product');
let inventory = require('./app/routes/inventory');
let item = require('./app/routes/item');

let config = require('config');

//db options
let options = {
                useMongoClient: true,
                keepAlive: 1,
                connectTimeoutMS: 30000
              };

//db connection
mongoose.Promise = require('bluebird');
mongoose.connect(config.DBHost, options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

//parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

// Routes
router
  .route('/')
  .get((req, res) => {
      res.send('Hello world\n')
  })

router
  .route('/clients')
  .get(client.getClients)
  .post(client.postClient)

router
  .route('/clients/:clientId')
  .get(client.getClient)
  .put(client.updateClient)
  .delete(client.deleteClient)

router
  .route('/orders')
  .get(order.getOrders)
  .post(order.postOrder)

router
  .route('/orders/:orderId')
  .get(order.getOrder)
  .put(order.updateOrder)
  .delete(order.deleteOrder)

router
  .route('/products')
  .get(product.getProducts)
  .post(product.postProduct)

router
  .route('/products/:productId')
  .get(product.getProduct)
  .put(product.updateProduct)
  .delete(product.deleteProduct)

router
  .route('/inventory')
  .get(inventory.getInventories)
  .post(inventory.postInventory)

router
  .route('/inventory/:inventoryId')
  .get(inventory.getInventory)
  .put(inventory.updateInventory)
  .delete(inventory.deleteInventory)

router
  .route('/items')
  .get(item.getItems)
  .post(item.postItem)

router
  .route('/items/:itemId')
  .get(item.getItem)
  .put(item.updateItem)
  .delete(item.deleteItem)

app.use('/v1', router);
app.listen(port);

console.log('Running on http://localhost:' + port);

module.exports = app; // for testing
