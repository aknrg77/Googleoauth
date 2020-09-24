const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/Users');
const env = require('./environment');
const crypto = require('crypto');

passport.use(new GoogleStrategy({
    clientID: env.google.clientID,
    clientSecret: env.google.clientSecret,
    callbackURL: env.google.callbackURL,
    passReqToCallback:true
  },
  async function (req,accessToken,refreshToken,profile,done){
        
    try{
    let user = await User.findOne({email: profile.emails[0].value});

    if(user){
        return done(null,user);
    }
    // if user is not found in the database the we have to sign up using google
    // create the user and set it to req.user
    else{
        User.create({
            name : profile.displayName,
            email : profile.emails[0].value,
            password : crypto.randomBytes(20).toString('hex')

            },function(err,user){
                if(err){console.log(err); return ;}
                return done(null,user);
            });     
        
    }
}catch(err){

}




}

));


// passport.serializeUser(function(user, done){

//     done(null, user.id);
// });

// // Used to decode the received cookie and persist session
// passport.deserializeUser(function(id, done) {
//     User.findById(id, function(err, user) {
//       done(err, user);
//     });
//   });


// passport.setAuthenticatedUser = function (req,res,next){
//     if(req.isAuthenticated()){
//         //req.user contains the current signed in user from the session cookie and we just sending this to the locals for the views
//         res.locals.user = req.user;

//     }
//     return next();

// }




module.exports = passport;
