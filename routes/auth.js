var express = require("express");
var router = express.Router()
var passport = require("passport");
var User = require("../models/user.js");


//AUTH ROUTES
router.get("/register",function(req,res){
    res.render("register.ejs");
});

router.post("/register",function(req,res){
    User.register(new User({username:req.body.username}),req.body.password,function(err,user){
        if(err){
            console.log(err);
            req.flash("error","Username already taken.");
            res.redirect("/register");
        }

        passport.authenticate("local")(req,res,function(){
            req.flash("success","Welcome! You are now registered.");
            res.redirect("/campgrounds");
        });
    });
});

router.get("/login",function(req,res){
    
    res.render("login.ejs");
});

router.post("/login",passport.authenticate("local",{successRedirect:"/campgrounds",failureRedirect:"/login"}),function(req,res){});

router.get("/logout",function(req,res){

    req.logout();
    req.flash("success","Logged Out.");
    res.redirect("/");
});

module.exports = router;