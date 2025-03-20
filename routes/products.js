'use strict'

var express = require('express');
var productController = require('../controllers/products');
var userController = require('../controllers/users');
var routes = express.Router();
var token = require('../helpers/auth');

routes.post('/api/product', token.validateToken, productController.createProduct);

routes.get('/api/product/:name', productController.findProductByName);

module.exports = routes;