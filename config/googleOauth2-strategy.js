var passport = require('passport');
const { nextTick } = require('process');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/Users');
const env = require('./environment');

passport.use(new GoogleStrategy({
    clientID: env.google.clientID,
    clientSecret: env.google.clientSecret,
    callbackURL: env.google.callbackURL
  },
  function (accessToken,refreshToken,profile,done){
        
            
    User.findOne({email: profile.emails[0].value}).exec(function(err,user){
        if(err){console.log('error in google strategy passport',err); return;}
    
    //console.log(accessToken,refreshToken);
    //console.log(profile);

    // if user is found in the google database and codial set this request in req.user

    if(user){
        return done(null,user);
    }
    // if user is not found in the database the we have to sign up using google
    // create the user and set it to req.user
    else{
        User.create({
        googleId:profile.id,    
        name : profile.displayName,
        email : profile.emails[0].value,

        },function(err,user){
            if(err){console.log('error in creating user google strategy-passport'); return ;}
            return done(null,user);
        });        
        
    }


});

}

));


passport.serializeUser(function(user, done){

    done(null, user.id);
});

// Used to decode the received cookie and persist session
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });


passport.setAuthenticatedUser = function (req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we just sending this to the locals for the views
        res.locals.user = req.user;

    }
    return next();

}




module.exports = passport;
