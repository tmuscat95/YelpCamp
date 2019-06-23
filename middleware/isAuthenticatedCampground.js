var campgroundModel = require("../models/campground.js");

module.exports = function isAuthenticatedCampground(req,res,next){
    if(req.isAuthenticated()){
        campgroundModel.findById(req.params.id,function(err,campground){
            if(err){
                console.log("Error authenticating" + err);
            }else{
                if(campground.author.id.equals(req.user._id)){
                    return next();
                }else{
                    req.flash("error","You do not have permission to do that.");
                    return res.redirect("/login");
                }
            }
        });

    }else{
        req.flash("error","You do not have permission to do that.");
        return res.redirect("/login");
    }

}

