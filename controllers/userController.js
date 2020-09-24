const User = require('../models/Users');
const passport = require('passport');
const bcrypt = require('bcrypt');



module.exports.create = async function(req,res){

    const {name ,email,password,confirm_password} = req.body;

    let errors = [];


  
        if(!name || !email || !password || !confirm_password){
            errors.push({msg : "Please Fill in all fields"});

        }

        if(req.body.password != req.body.confirm_password)
        {
            errors.push({msg : "Passwords do not match"});
        }

        if(password.length < 6){
            errors.push({msg : "Password should be atleast 6 characters"});
        }

        if(errors.length>0){
            res.render('register',{
                errors,
                name,
                email,
                password,
                confirm_password
            })
        }else{
            try{
                let user = await User.findOne({email:email});
                if(!user){
                    user = new User({
                        name,
                        email,
                        password,
                    });
                    
                }
                else{
                    errors.push('Email is already registered');
                    res.render('register',{
                        errors,
                        name,
                        email,
                        password,
                        confirm_password
                    });
                }
                bcrypt.genSalt(10,function(err,salt){
                    bcrypt.hash(user.password,salt,function(err,hash){
                        if(err){
                            console.log(err);
                        }
                        //seting hashed password
                        user.password = hash;
                        user.save(function(err){
                            if(err){
                                console.log(err);
                            }else{
                                req.flash(
                                    'success_msg',
                                    'You are now registered and can log in'
                                  );
                                res.redirect('/users/login');
                            }

                        });
                            
                    })
                })
                

              }catch(err){
                  console.log('Error',err);
              }
        }
    
       

    

}

module.exports.createSession = function(req,res,next){
    passport.authenticate('local',{
        successRedirect : '/users/profile',
        failureRedirect : '/users/login',
        failureFlash: true

    })(req,res,next);

}