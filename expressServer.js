var express = require("express");
var bodyParser = require("body-parser");
var expressSanitizer = require("express-sanitizer");

var expressSession = require("express-session");
var passport = require("passport");
var localStrategy = require("passport-local");
var User = require("./models/user.js");

var app = express();

app.use(expressSession({secret:"mysecret",
                        resave:false,
                        saveUninitialized:false}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set("view engine","ejs");
app.use(expressSanitizer());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});

module.exports = app;

