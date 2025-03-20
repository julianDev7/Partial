'use strict'

var express = require('express');
var userController = require('../controllers/users');
var routes = express.Router();

routes.post('/api/user', userController.CreateUser);
routes.post('/api/login', userController.loginUser);
routes.get('/api/loginn', userController.findRoleByUsername);

module.exports = routes;
