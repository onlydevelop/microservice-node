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

//export all the functions
module.exports = { getOrders, postOrder, getOrder, deleteOrder, updateOrder };
