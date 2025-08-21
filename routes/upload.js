const router = require("express").Router();
const controller = require("../controllers/uploadController");
const { isLoggedIn } = require("./authMiddleware");

router.get("/", isLoggedIn, controller.getHomePage);
router.get("/log-out", (req, res, next) => {
    req.logOut(function (err) {
        if (err) return next(err);
        req.session.destroy(err => {
            if (err) console.error("Session destroy error: ", err);
            res.redirect("/log-in");
        })
    })
})

module.exports = router;