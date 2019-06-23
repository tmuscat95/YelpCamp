module.exports = function isLoggedIn(req,res,next){
    if(req.user){
        return next();
    }
    req.flash("error","Please Log In Or Register.");  
    res.redirect("/login");
}