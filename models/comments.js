var mongoose = require("mongoose");
var hosts = require("../hosts.js");
const port = hosts.port;
const host = hosts.host;

mongoose.connect("mongodb://"+host+"/yelpcamp");

var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var commentSchema = new mongoose.Schema({
    commentBody: String,
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username: String
    },
    date:{type:Date, default: Date.now()}
});

module.exports = mongoose.model("Comment",commentSchema);