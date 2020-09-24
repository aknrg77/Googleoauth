const express = require('express');
const route = express.Router();
const homeController = require('../controllers/homeController');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const passport = require('passport');
const { ensureAuth , forwardAuth } = require('../middleware/userLogin');

route.get('/',forwardAuth,homeController.home);

route.use('/users',require('./users'));

module.exports = route;