let mongoose = require('mongoose');
let Inventory = require('../models/inventory');

/*
 * GET /inventory route to retrieve all the inventory.
 */
function getInventories(req, res) {
    //Query the DB and if no errors, send all the inventorys
    let query = Inventory.find({});
    query.exec((err, inventory) => {
        if(err) res.send(err);
        //If no errors, send them back to the inventory
        res.json(inventory);
    });
}

/*
 * POST /inventory to save a new inventory.
 */
function postInventory(req, res) {
    //Creates a new Inventory
    var newInventory = new Inventory(req.body);
    //Save it into the DB.
    newInventory.save((err, inventory) => {
        if(err) {
            res.send(err);
        }
        else { //If no errors, send it back to the inventory
            res.json({message: "Inventory successfully added!", inventory });
        }
    });
}

/*
 * GET /inventory/:id route to retrieve a inventory given its id.
 */
function getInventory(req, res) {
    Inventory.findById(req.params.inventoryId, (err, inventory) => {
        if(err) res.send(err);
        //If no errors, send it back to the inventory
        res.json(inventory);
    });
}

/*
 * DELETE /inventory/:id to delete a inventory given its id.
 */
function deleteInventory(req, res) {
    Inventory.remove({_id : req.params.inventoryId}, (err, inventory) => {
        res.json({ message: "Inventory successfully deleted!", inventory });
    });
}

/*
 * PUT /inventory/:id to update a inventory given its id
 */
function updateInventory(req, res) {
    Inventory.findById({_id: req.params.inventoryId}, (err, inventory) => {
        if(err) res.send(err);
        Object.assign(inventory, req.body).save((err, inventory) => {
            if(err) res.send(err);
            res.json({ message: 'Inventory updated!', inventory });
        });
    });
}

//export all the functions
module.exports = { getInventories, postInventory, getInventory, deleteInventory, updateInventory };
