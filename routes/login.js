const express = require('express');
const route = express.Router();
const loginController = require('../controllers/login');
const passport = require('passport');


route.get('/',loginController.login);

route.get('/logout',function(req,res){
    req.logOut();
    res.redirect('/');
  })


module.exports = route;