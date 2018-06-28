let mongoose = require('mongoose');
let Order = require('../models/order');

/*
 * GET /order route to retrieve all the orders.
 */
function getOrders(req, res) {
    //Query the DB and if no errors, send all the orders
    let query = Order.find({});
    query.exec((err, orders) => {
        if(err) res.send(err);
        //If no errors, send them back to the order
        res.json(orders);
    });
}

/*
 * POST /order to save a new order.
 */
function postOrder(req, res) {
    //Creates a new Order
    var newOrder = new Order(req.body);
    //Save it into the DB.
    newOrder.save((err, order) => {
        if(err) {
            res.send(err);
        }
        else { //If no errors, send it back to the order
            res.json({message: "Order successfully added!", order });
        }
    });
}

/*
 * GET /order/:id route to retrieve a order given its id.
 */
function getOrder(req, res) {
    Order.findById(req.params.orderId, (err, order) => {
        if(err) res.send(err);
        //If no errors, send it back to the order
        res.json(order);
    });
}

/*
 * DELETE /order/:id to delete a order given its id.
 */
function deleteOrder(req, res) {
    Order.remove({_id : req.params.orderId}, (err, order) => {
        res.json({ message: "Order successfully deleted!", order });
    });
}

/*
 * PUT /order/:id to update a order given its id
 */
function updateOrder(req, res) {
    Order.findById({_id: req.params.orderId}, (err, order) => {
        if(err) res.send(err);
        Object.assign(order, req.body).save((err, order) => {
            if(err) res.send(err);
            res.json({ message: 'Order updated!', order });
        });
    });
}

/*
 * GET /clients/:clientId/orders route to retrieve an order for given client.
 */
function getOrdersByClientId(req, res) {
    Order.find({clientId: req.params.clientId}, (err, orders) => {
        if(err) res.send(err);
        //If no errors, send it back to the order
        res.json(orders);
    });
}

/*
 * POST /clients/:clientId/orders route to create an order for given client.
 */
function postOrderByClientId(req, res) {
    //Creates a new Order
    req.body.clientId = req.params.clientId;
    var newOrder = new Order(req.body);
    //Save it into the DB.
    newOrder.save((err, order) => {
        if(err) {
            res.send(err);
        }
        else { //If no errors, send it back to the order
            res.json({message: "Order successfully added!", order });
        }
    });
}

/*
 * GET /clients/:clientId/orders route to retrieve orders for given client.
 */
function getOrdersByClientId(req, res) {
    Order.find({clientId: req.params.clientId}, (err, orders) => {
        if(err) res.send(err);
        //If no errors, send it back to the order
        res.json(orders);
    });
}

/*
 * GET /clients/:clientId/orders/:orderId route to retrieve a given order for given client.
 */
function getOrderByClientId(req, res) {
    Order.find({clientId: req.params.clientId, _id: req.params.orderId}, (err, order) => {
        if(err) res.send(err);
        //If no errors, send it back to the order
        res.json(order);
    });
}

/*
 * PUT /clients/:clientId/order/:orderId to update an order given its id
 */
function updateOrderByClientId(req, res) {
  req.body.clientId = req.params.clientId
  Order.findOneAndUpdate({clientId: req.params.clientId, _id: req.params.orderId}, req.body, (err, order) => {
    if(err) res.send(err);
    res.json({ message: "Order successfully updated!", order});
  });
}

/*
 * DELETE /clients/:clientId/order/:orderId to delete an order given its id
 */
function deleteOrderByClientId(req, res) {
  Order.findOneAndRemove({clientId: req.params.clientId, _id: req.params.orderId}, (err, order) => {
    if(err) res.send(err);
    res.json({ message: "Order successfully deleted!", order});
  });
}

//export all the functions
module.exports = {
  getOrders, postOrder, getOrder, deleteOrder, updateOrder,
  getOrdersByClientId, postOrderByClientId,
  getOrderByClientId, updateOrderByClientId, deleteOrderByClientId
};
