var express = require("express");
var router = express.Router({mergeParams:true})
var campgroundModel = require("../models/campground.js");
var isLoggedIn = require("../isLoggedIn.js");

function campground(name,imgUrl,description,author){
    this.name = name;
    this.imgUrl = imgUrl;
    this.description = description;
    this.author = author;
}

router.get("/campgrounds",function(req,res){

    campgroundModel.find({},function(err,campgrounds){
        if(err)
            console.log(err);
        else{
            console.log(campgrounds.length + " records retrieved.");
            console.log(campgrounds);
            res.render("campgrounds/index.ejs",{campgrounds:campgrounds});
        }
    });
    
});
//create
router.post("/campgrounds",isLoggedIn,function(req,res){
    
    var n = req.body.name;
    var url = req.body.imgUrl;
    var desc = req.body.description;
    // campgrounds.push(new campground(n,url));
    var author = {_id:req.user.id,username:req.user.username}
    var newCampground = new campgroundModel(new campground(n,url,desc,author));
    newCampground.save(function(err,c){
        if(err)
            console.log(err)
        else{
            console.log("New campground added.");
            console.log(c);
            res.redirect("/campgrounds");
        }
    });
    
});
//add new
router.get("/campgrounds/new",isLoggedIn,function(req,res){
    res.render("campgrounds/new.ejs");
});



//show
router.get("/campgrounds/:id",function(req,res){
    campgroundModel.findById(req.params.id).populate("comments").exec(function(err,campground){
        if(err)
            console.log(err);
        else if(campground){
            res.render("campgrounds/show.ejs",{"campground":campground});
        }else{
            console.log("id invalid");
            res.send("404 Not found");
        }

    });
});

module.exports = router;