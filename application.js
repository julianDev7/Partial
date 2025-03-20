'use strict'

var express = require("express");
var bodyParser = require("body-parser");
var routesProduct = require("./routes/products");
var routesUser = require("./routes/users");

var application = express();

application.use(bodyParser.json());
application.use(bodyParser.urlencoded({"extended": false}));
application.use(routesProduct);
application.use(routesUser);

module.exports = application;
