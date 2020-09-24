const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/Users');
const bcrypt = require('bcrypt');


// authentication using passport 
passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true
},
async function (req,email,password,done){

    //if Match User
    try{
    let user = await  User.findOne({email:email})
        
        if(!user){
            return done(null,false, {message : "email not registered"});
        }
        bcrypt.compare(password,user.password,function(err,isMatch){
            if(err) throw err;

            if(isMatch){
                return done(null,user);
            }else{
                return done(null,false ,{message : "Password incorrect"});
            }
        });

        



    }catch(err){
        console.log('Error',err);
    }

    

}
));


//serializing the user to decide which key is to be kept in the cookies

passport.serializeUser(function(user,done){
    done(null,user.id);
});





//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err)
        {
            console.log('Error in finding User -->Passport');
            return done(err);
        }
        return done(null,user);
    });

});

passport.checkAuthentication = function(req,res,next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in 
    return res.redirect('/');
}


//views the authenticated user  (middleware)
passport.setAuthenticatedUser = function (req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we just sending this to the locals for the views
        res.locals.user = req.user;
    }
    return next();
}


module.exports = passport;