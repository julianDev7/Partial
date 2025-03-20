'use strict'

var User = require('../models/users');
var token = require('../helpers/auth');
var bcrypt = require('bcryptjs');
const users = require('../models/users');

function CreateUser(req, resp){

    var parameters = req.body;
    var salt = bcrypt.genSaltSync(15);

    var newUser = new User();
    newUser.username = parameters.username;
    newUser.password = bcrypt.hashSync(parameters.password, salt);
    newUser.role = parameters.role;

    newUser.save().then(
        (userSaved) => {
            resp.status(200).send({'message': 'User created succesfully'});
        },
        err => {
            resp.status(500).send({'message': 'An error ocurred while creating the user', 'error': err })
        }
    )
}

function loginUser(req, resp){
    var parameters = req.body;

    User.findOne({'username': parameters.username}).then(
        (userFound) => {
            if(userFound == null){
                resp.status(403).send({'message': 'User not found'});
            }
            if(bcrypt.compareSync(parameters.password, userFound.password)){
                resp.status(200).send({'message': 'Login Successful', 'token': token.generateToken(userFound)});
            }
            else{
                resp.status(403).send({'message': 'Invalid Login'});
            }
        },
        err => {
            resp.status(500).send({'message': 'An error ocurred while validating the user', 'error': err })    
        }
    )
}

//ignorar
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
module.exports = {CreateUser, loginUser, findRoleByUsername}
