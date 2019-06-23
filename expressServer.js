var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");
var flash = require("connect-flash");
var expressSession = require("express-session");
var passport = require("passport");
var localStrategy = require("passport-local");

var User = require("./models/user.js");

var app = express();

app.set("view engine","ejs");
app.use(expressSanitizer());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(flash());

//Passport And Authentication
app.use(expressSession({secret:"mysecret",
                        resave:false,
                        saveUninitialized:false}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    return next();
});

/////////////////////////////
module.exports = app;

