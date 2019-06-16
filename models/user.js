var passportMongoose = require("passport-local-mongoose");
var mongoose = require("mongoose");
var hosts = require("../hosts.js");

const host = hosts.host;
const port = hosts.port;
mongoose.plugin(passportMongoose);


mongoose.connect("mongodb://"+host+"/yelpcamp",function(err){
    if(err){
        console.log((err));
    }
    else
        console.log("Users schema connected");
});

var userSchema = new mongoose.Schema({
    username:String,
    password:String
});

module.exports = mongoose.model("User",userSchema);

