const User = require("../models/user");
const fs=require('fs');
const path=require('path');
module.exports.profile = function(req, res){
    User.findById(req.params.id,function(err,user){
      return res.render('user_profile',{
        title:'User profile',
        profile_user:user
      });
    });
   
}

module.exports.update = async function(req, res){
  try{
    if(req.user.id == req.params.id){
      let user=await User.findById(req.params.id);
      User.uploadedAvatar(req,res,function(err){
        if(err){
          console.log("Multer Error",err);
        }
        user.name=req.body.name;
        user.email=req.body.email;

        if(req.file){
          if(user.avatar){
            fs.unlinkSync(path.join(__dirname,'..',user.avatar));
          }
          user.avatar=User.avatarPath+'/'+req.file.filename;
        }
        user.save();
        return res.redirect('back');
         })
    }
    else{
      return res.status(401).send('Unauthorized');
  }
  }catch(err){
    req.flash("error", err);
  return res.redirect("back");

  }
  // if(req.user.id == req.params.id){
  //     User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
  //       req.flash('success','Profile Updated Successfully!')
  //         return res.redirect('back');
  //     });
  // }
  
}


module.exports.sign_in = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    title: "Sign In",
  });
};
module.exports.sign_up = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", {
    title: "Sign up",
  });
};
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in finding user in signing up");
      return;
    }

    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("error in creating user while signing up");
          return;
        }

        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};

module.exports.createSession = function (req, res) {
  req.flash('success','Logged in Sucessfully..');
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout();
  req.flash('success','Logged out..');
  return res.redirect("/");
};
