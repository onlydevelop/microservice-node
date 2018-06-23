let mongoose = require('mongoose');
let Product = require('../models/product');

/*
 * GET /product route to retrieve all the products.
 */
function getProducts(req, res) {
    //Query the DB and if no errors, send all the products
    let query = Product.find({});
    query.exec((err, products) => {
        if(err) res.send(err);
        //If no errors, send them back to the product
        res.json(products);
    });
}

/*
 * POST /product to save a new product.
 */
function postProduct(req, res) {
    //Creates a new Product
    var newProduct = new Product(req.body);
    //Save it into the DB.
    newProduct.save((err, product) => {
        if(err) {
            res.send(err);
        }
        else { //If no errors, send it back to the product
            res.json({message: "Product successfully added!", product });
        }
    });
}

/*
 * GET /product/:id route to retrieve a product given its id.
 */
function getProduct(req, res) {
    Product.findById(req.params.productId, (err, product) => {
        if(err) res.send(err);
        //If no errors, send it back to the product
        res.json(product);
    });
}

/*
 * DELETE /product/:id to delete a product given its id.
 */
function deleteProduct(req, res) {
    Product.remove({_id : req.params.productId}, (err, product) => {
        res.json({ message: "Product successfully deleted!", product });
    });
}

/*
 * PUT /product/:id to update a product given its id
 */
function updateProduct(req, res) {
    Product.findById({_id: req.params.productId}, (err, product) => {
        if(err) res.send(err);
        Object.assign(product, req.body).save((err, product) => {
            if(err) res.send(err);
            res.json({ message: 'Product updated!', product });
        });
    });
}

//export all the functions
module.exports = { getProducts, postProduct, getProduct, deleteProduct, updateProduct };
