# Running

```
$ docker-compose up
Starting 2-dockerisedmonolith_mongodb-test_1 ... done
Starting 2-dockerisedmonolith_mongodb-dev_1  ... done
...
$ npm start
...
```
# API Specification

## Clients
```
GET /v1/clients - Get all clients
POST /v1/clients - Create a new client

GET /v1/clients/1234 - Get client with id=1234
PUT /v1/clients/1234 - Update an existing client
DELETE /v1/clients/1234 - Delete an existing client

GET /v1/clients/1234/orders - Get all orders for client=1234
POST /v1/clients/1234/orders - Create an order for client=1234

GET /v1/clients/1234/orders/2345 - Get order number=2345 for client=1234
PUT /v1/clients/1234/orders/2345 - Update order number=2345 for client=1234
DELETE /v1/clients/1234/orders/2345 - Delete order number=2345 for client=1234
```

## Orders
```
GET /v1/orders - Get all orders
POST /v1/orders - Create a new order

GET /v1/orders/2345 - Get order=2345
PUT /v1/orders/2345 - Update order=2345
DELETE /v1/orders/2345 - Delete order=2345

GET /v1/orders/2345/items - Get all items for order=2345
POST /v1/orders/2345/items - Create new item for order=2345

GET /v1/orders/2345/items/3456 - Get item=3456 for order=2345
PUT /v1/orders/2345/items/3456 - Update item=3456 for order=2345
DELETE /v1/orders/2345/items/3456 - Delete item=3456 for order=2345
```

## Products
```
GET /v1/products - Get all products
POST /v1/products - Create a new product

GET /v1/products/4567 - Get product=4567
PUT /v1/products/4567 - Update product=4567
DELETE /v1/products/4567 - Delete product=4567
```

## Inventory
```
GET /v1/inventories - Get all inventories
POST /v1/inventories - Create a new inventory

GET /v1/inventories/5678 - Get inventory=5678
PUT /v1/inventories/5678 - Update inventory=5678
DELETE /v1/inventories/5678 - Delete inventory=5678
```
