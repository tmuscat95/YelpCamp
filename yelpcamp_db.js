var mongoose = require("mongoose");
var hosts = require("./hosts.js")
var host = hosts["host"];
var port = hosts["port"];

mongoose.connect("mongodb://"+host+"/yelpcamp",function(err){
    if(err)
        console.log(err);
    else
        console.log("db connection success");

});

var campgroundSchema = new mongoose.Schema({
    name:String,
    imgUrl:String,
    description: String,
    created: {type:Date, default: Date.now()}
});

var campgroundModel = mongoose.model("campground",campgroundSchema);

module.exports = campgroundModel;