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
            return res.render("register");
        }

        passport.authenticate("local")(req,res,function(){
            res.redirect("/campgrounds");
        });
    });
});

router.get("/login",function(req,res){
    res.render("login.ejs");
});

router.post("/login",passport.authenticate("local",{successRedirect:"/",failureRedirect:"/"}),function(req,res){});

router.post("logout",function(req,res){
    passport.logout();
});

module.exports = router;