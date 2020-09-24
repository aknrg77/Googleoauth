const express = require('express');
const route = express.Router();

const passport = require('passport');


route.get('/',loginController.login);




module.exports = route;