const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');

//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID:'446541491768-fg9bff48nqjp3ammrejd8jt9fgl3cv68.apps.googleusercontent.com',
    clientSecret:'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',
    callbackURL:'http://localhost:8000/users/auth/google/callback'
    },
    function(accessToken,refreshToken,profile,done){
        //find a user 
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log("error in google startegy passport",err);
                return; 
            }
            console.log(profile);
            if(user){
                return done(null,user);
            }
            //if not found ,create the user and set is as req.user
            else{
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){
                        console.log("error in creating user google startegy passport",err);
                        return; 
                    }else{
                        return done(null,user);
                    }
                });
            }
        });
    }
));
module.exports=passport;