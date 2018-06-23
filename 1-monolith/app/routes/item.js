let mongoose = require('mongoose');
let Item = require('../models/item');

/*
 * GET /item route to retrieve all the items.
 */
function getItems(req, res) {
    //Query the DB and if no errors, send all the items
    let query = Item.find({});
    query.exec((err, items) => {
        if(err) res.send(err);
        //If no errors, send them back to the item
        res.json(items);
    });
}

/*
 * POST /item to save a new item.
 */
function postItem(req, res) {
    //Creates a new Item
    var newItem = new Item(req.body);
    //Save it into the DB.
    newItem.save((err, item) => {
        if(err) {
            res.send(err);
        }
        else { //If no errors, send it back to the item
            res.json({message: "Item successfully added!", item });
        }
    });
}

/*
 * GET /item/:id route to retrieve a item given its id.
 */
function getItem(req, res) {
    Item.findById(req.params.itemId, (err, item) => {
        if(err) res.send(err);
        //If no errors, send it back to the item
        res.json(item);
    });
}

/*
 * DELETE /item/:id to delete a item given its id.
 */
function deleteItem(req, res) {
    Item.remove({_id : req.params.itemId}, (err, item) => {
        res.json({ message: "Item successfully deleted!", item });
    });
}

/*
 * PUT /item/:id to update a item given its id
 */
function updateItem(req, res) {
    Item.findById({_id: req.params.itemId}, (err, item) => {
        if(err) res.send(err);
        Object.assign(item, req.body).save((err, item) => {
            if(err) res.send(err);
            res.json({ message: 'Item updated!', item });
        });
    });
}

//export all the functions
module.exports = { getItems, postItem, getItem, deleteItem, updateItem };
