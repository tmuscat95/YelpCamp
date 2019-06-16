var app = require("./expressServer.js");
var passport = require("passport");
var User = require("./models/user.js");
var hosts = require("./hosts");
var campgroundModel = require("./models/campground.js");
var commentModel = require("./models/comments.js");

var host = hosts["host"];
var port = hosts["port"];

function campground(name,imgUrl,description){
    this.name = name;
    this.imgUrl = imgUrl;
    this.description = description;
}

//AUTH ROUTES
app.get("/register",function(req,res){
    res.render("register.ejs");
});

app.post("/register",function(req,res){
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

app.get("/login",function(req,res){
    res.render("login.ejs");
});

app.post("/login",passport.authenticate("local",{successRedirect:"/authenticated",failureRedirect:"/"}),function(req,res){});

app.post("logout",function(req,res){
    passport.logout();
});

function isLoggedIn(req,res,next){
    if(req.isLoggedIn()){
       return next(); 
    }
    else redirect("/login");
}
///// 


//index
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
            res.render("campgrounds/index.ejs",{campgrounds:campgrounds});
        }
    });
    
});
//create
app.post("/campgrounds",isLoggedIn,function(req,res){
    
    var n = req.body.name;
    var url = req.body.imgUrl;
    var desc = req.body.description;
    // campgrounds.push(new campground(n,url));
    var newCampground = new campgroundModel(new campground(n,url,desc));
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
app.get("/campgrounds/new",isLoggedIn,function(req,res){
    res.render("campgrounds/new.ejs");
});



//show
app.get("/campgrounds/:id",function(req,res){
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

//add comment
app.get("/campgrounds/:id/add",isLoggedIn,function(req,res){
    res.render("comments/new.ejs",{id:req.params.id});
});

//create comment
app.post("/campgrounds/:id",isLoggedIn,function(req,res){
    var newComment = new commentModel({author:req.sanitize(req.body.comment.author),commentBody:req.sanitize(req.body.comment.body)});
    newComment.save(function(err,comment){
        if(err){
            console.log(err);
            res.send("Error saving comment");
        }else{
            campgroundModel.findById(req.params.id,function(err,campground){
                campground.comments.push(comment);
                campground.save();
                res.redirect("/campgrounds/"+req.params.id);
            });
        }

    });
});
app.listen(port,host,function(){
    console.log("YelpCamp");
    console.log("listening on port "+port);
});