
var express = require("express");
var router = express.Router({mergeParams:true})

var commentModel = require("../models/comments.js");
var campgroundModel = require("../models/campground.js");
var isLoggedIn = require("../isLoggedIn.js");


//add comment
router.get("/campgrounds/:id/add",isLoggedIn,function(req,res){
    res.render("comments/new.ejs",{id:req.params.id});
});

//create comment
router.post("/campgrounds/:id",isLoggedIn,function(req,res){
    var newComment = new commentModel({author:{
        id:req.user.id,
        username: req.user.username
    },commentBody:req.sanitize(req.body.comment.body)});

    newComment.save(function(err,comment){
        if(err){
            console.log(err);
            res.send("Error saving comment");
        }else{
            campgroundModel.findById(req.params.id,function(err,campground){
                campground.comments.push(comment);
                campground.save();
                res.redirect("/campgrounds/"+req.params.id);
            });
        }

    });
});

module.exports = router;