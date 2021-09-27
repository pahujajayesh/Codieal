

const passport = require('passport');
console.log('passport is loaded now');
const localStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new localStrategy({
    usernameField:'email'
},
function(email,password,done){
    User.findOne({email:email},function(err,user){
        if(err){
            console.log("error in finding the user");
            return done(err);
        }
        if(!user || user.password!=password){
            console.log("invalid Username/Password");
            return done(null,false);
        }
        return done(null,user);
    });

}));

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);   // user.id is sent to session in index.js to encript cookie
});



// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null, user);
    });
});

passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated){
        return next();
    }

    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
}


module.exports = passport;

