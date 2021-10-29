const passport=require('passport');
const JWTStrategy=require('passport-jwt').Strategy;
const ExtractJWt=require('passport-jwt').ExtractJwt;
const User=require('../models/user');
let opts={
    jwtFromRequest:ExtractJWt.fromAuthHeaderAsBearerToken(),
    secretOrKey:'codieal',

}
passport.use(new JWTStrategy(opts,function(jwtPayload,done){
    User.findById(jwtPayload._id,function(err,user){
        if(err){
            console.log("error in finding user from jwt");
            return;
        }
        if(user){
            return done(null,user);

        }
        else{
            return done(null,false);
        }
    })
}));

module.exports=passport;