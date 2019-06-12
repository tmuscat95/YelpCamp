var app = require("./expressServer.js");
var hosts = require("./hosts")
var campgroundModel = require("./yelpcamp_db.js");

var host = hosts["host"];
var port = hosts["port"];
// var express = require("express");
// var bodyParser = require("body-parser");
// var mongoose = require("mongoose");




function campground(name,imgUrl){
    this.name = name;
    this.imgUrl = imgUrl
}




// var campgrounds = [
//     new campground("Buskett","http://mymalta.guide/uploads/photo/gallery_photo/374/full_buskett-gardens_2.jpg"),
//     new campground("Ahrax","https://cdn-attachments.timesofmalta.com/local_14_temp-1414825933-545487cd-620x348.jpg"),
//     new campground("Cirkewwa","https://c8.alamy.com/comp/BK8EWA/paradise-bay-in-cirkewwa-malta-europe-BK8EWA.jpg")
// ];


app.get("/",function(req,res){
    res.render("home.ejs");
});

app.get("/campgrounds",function(req,res){

    campgroundModel.find({},function(err,campgrounds){
        if(err)
            console.log(err);
        else{
            console.log(campgrounds.length + " records retrieved.");
            console.log(campgrounds);
            res.render("campgrounds.ejs",{campgrounds:campgrounds});
        }
    });
    
});

app.post("/campgrounds",function(req,res){
    
    var n = req.body.name;
    var url = req.body.imgUrl;

    // campgrounds.push(new campground(n,url));
    var newCampground = new campgroundModel(new campground(n,url));
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

app.get("/campgrounds/new",function(req,res){
    res.render("new.ejs");
});

app.listen(port,host,function(){
    console.log("YelpCamp");
});
