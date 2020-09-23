const express = require('express');
const route = express.Router();
const homeController = require('../controllers/homeController');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const passport = require('passport');
const { ensureAuth , forwardAuth } = require('../middleware/userLogin');

route.get('/',forwardAuth,homeController.home);


route.use('/profile',ensureAuth,require('./login'));

route.get('/auth/google',
passport.authenticate('google',{scope:['profile','email']})

);


route.get('/auth/google/callback',
  passport.authenticate('google', 
  { 
    successRedirect: '/profile',
    failureRedirect: '/'

    })
    
    );






module.exports = route;