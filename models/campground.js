var mongoose = require("mongoose");
var hosts = require("../hosts.js")
const host = hosts["host"];
const port = hosts["port"];

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
    created: {type:Date, default: Date.now()},
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }],
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

var campgroundModel = mongoose.model("campground",campgroundSchema);

module.exports = campgroundModel;