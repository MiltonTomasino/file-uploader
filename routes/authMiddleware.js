module.exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) next();
    else res.redirect("/log-in")
}

module.exports.preventLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) res.redirect("/");
    else next();
}