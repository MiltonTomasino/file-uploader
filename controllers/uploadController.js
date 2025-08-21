

module.exports.getHomePage = (req, res) => {
    res.render("upload", { title: "Home Page", user: req.user});
}