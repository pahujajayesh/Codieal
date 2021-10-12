const Post = require("../models/post");
const Comment = require("../models/comment");
try {
    module.exports.create = async function (req, res) {
        await Post.create({
          content: req.body.content,
          user: req.user._id,
        });
        req.flash('success',"Post Created Sucessfully!!")
        return res.redirect("back");
      }
} catch (err) {
  req.flash("error", err);
  return res.redirect("back");
}

try{
    module.exports.destroy = async function (req, res) {

        let post=await Post.findById(req.params.id);
           if (post.user == req.user.id) {
             post.remove();
             await Comment.deleteMany({ post: req.params.id })
             req.flash('success','Post and associated Comments deleted');
             return res.redirect('back');
           } else {
             req.flash('error','you cannot delete this post');
             return res.redirect("back");
           }
       
       }
       
}
catch (err) {
  req.flash("error", err);
  return res.redirect("back");
}
