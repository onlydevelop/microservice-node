let mongoose = require('mongoose');
let Client = require('../models/Client');

/*
 * GET /client route to retrieve all the clients.
 */
function getClients(req, res) {
    //Query the DB and if no errors, send all the clients
    let query = Client.find({});
    query.exec((err, clients) => {
        if(err) res.send(err);
        //If no errors, send them back to the client
        res.json(clients);
    });
}

/*
 * POST /client to save a new client.
 */
function postClient(req, res) {
    //Creates a new Client
    var newClient = new Client(req.body);
    //Save it into the DB.
    newClient.save((err, client) => {
        if(err) {
            res.send(err);
        }
        else { //If no errors, send it back to the client
            res.json({message: "Client successfully added!", client });
        }
    });
}

/*
 * GET /client/:id route to retrieve a Client given its id.
 */
function getClient(req, res) {
    Client.findById(req.params.clientId, (err, client) => {
        if(err) res.send(err);
        //If no errors, send it back to the client
        res.json(client);
    });
}

/*
 * DELETE /client/:id to delete a Client given its id.
 */
function deleteClient(req, res) {
    Client.remove({_id : req.params.clientId}, (err, client) => {
        res.json({ message: "Client successfully deleted!", client });
    });
}

/*
 * PUT /client/:id to update a Client given its id
 */
function updateClient(req, res) {
    Client.findById({_id: req.params.clientId}, (err, client) => {
        if(err) res.send(err);
        Object.assign(client, req.body).save((err, client) => {
            if(err) res.send(err);
            res.json({ message: 'Client updated!', client });
        });
    });
}

//export all the functions
module.exports = { getClients, postClient, getClient, deleteClient, updateClient };
