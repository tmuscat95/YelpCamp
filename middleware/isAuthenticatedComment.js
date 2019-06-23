var commentModel = require("../models/comments.js");

module.exports = function isAuthenticatedComment(req,res,next){
    if(req.isAuthenticated()){
        commentModel.findById(req.params.comment_id,function(err,comment){
            if(err){
                console.log(err);
                req.flash("error","You do not have permission to do that.");
                return res.redirect("/campgrounds/"+req.params.id);
            }else if(comment.author.id.equals(req.user._id)){
                return next();
            }
        });
    }else{
        req.flash("error","You do not have permission to do that.");
        return res.redirect("/campgrounds/"+req.params.id);
    }
}