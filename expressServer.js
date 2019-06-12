var express = require("express");
var bodyParser = require("body-parser");
var expressSanitizer = require("express-sanitizer");
var app = express();



app.set("view engine","ejs");
app.use(expressSanitizer());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

module.exports = app;

