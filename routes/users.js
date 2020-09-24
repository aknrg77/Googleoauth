const express = require('express');
const route = express.Router();
const userController= require('../controllers/userController');
const passport = require('passport');
const { ensureAuth , forwardAuth } = require('../middleware/userLogin');
const profile = require('../controllers/login');

route.get('/register',function(req,res){
      res.render('register');
});



route.get('/login',function(req,res){

      res.render('login');

});

route.post('/login',userController.createSession);

route.post('/register',userController.create);



route.get('/auth/google',
passport.authenticate('google',{scope:['profile','email']})

);

route.get('/auth/google/callback',
  passport.authenticate('google', 
  { 
    successRedirect: '/users/profile',
    failureRedirect: '/',
    failureFlash : true

    })
    
    );

route.get('/profile',profile.login);

route.get('/logout', (req, res) => {
      req.logout();
      req.flash('success_msg', 'You are logged out');
      res.redirect('/users/login');
    });


module.exports = route;