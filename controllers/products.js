'use strict'

var product = require('../models/products');
var User = require('../models/users');

function createProduct(req, resp){

    var username = req.body.username;
    var role;

    User.findOne(
        { username: username }, 
        { role: 1, _id: 0 } 
    ).then(
        (userRole) => {
            role=userRole.role
            if (role==='admin'){
                var productReqBody = req.body;

                var newProduct = new product();
                newProduct.name  = productReqBody.name;
                newProduct.description = productReqBody.description;
                newProduct.price = productReqBody.price;

                if(newProduct.name === null || newProduct.name.trim() ===''
                    || newProduct.duration === null || newProduct.duration <= 0
                    || newProduct.price === null || newProduct.price <= 0){
                        resp.status(400).send({"message": "One or more required variables were not sent" })
                } 
                    
                
                newProduct.save().then(
                    (savedProduct) => {
                        resp.status(200).send({"message": "Product was created succesfully", 'product': savedProduct})
                    },
                    err => {
                        resp.status(500).send({"message": "An error ocurred while creating the product", "error": err})
                    }
                );
                        }
                    else{resp.status(403).send({"message": "You do not have permission to perform this action."})}
                    }
                )

}

function findProductByName(req, resp){
     var nameToFind = req.params.name;

     product.find(
        {
            name: {$regex: nameToFind}
        }
     ).then(
        (foundProduct) => {
            resp.status(200).send({'product': foundProduct});
        },
        err => {
            resp.status(500).send({'message':'An error ocurred while searching the courses', 'error': err});
        }
     );
}

function findRoleByUsername(req, resp) {
    var username = req.body.username;
    var role;

    User.findOne(
        { username: username }, 
        { role: 1, _id: 0 } 
    ).then(
        (userRole) => {
            role=userRole.role
            console.log()
            return role
        }
    )
}


module.exports = {createProduct, findProductByName}
