var app = require("./expressServer.js");
var hosts = require("./hosts");

var campgroundRoutes = require("./routes/campgrounds.js");
var authRoutes = require("./routes/auth.js");
var commentsRoutes = require("./routes/comments.js");
var campgroundModel = require("./models/campground.js");

var host = hosts["host"];
var port = hosts["port"];

app.use(campgroundRoutes);
app.use(commentsRoutes);
app.use(authRoutes);



//index
app.get("/",function(req,res){
    // campgroundModel.find({}).limit(5).exec(function(err,items){

    // });
    
    res.render("home.ejs");
    
});


app.listen(port,host,function(){
    console.log("YelpCamp");
    console.log("listening on port "+port);
});