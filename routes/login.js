const router = require("express").Router();
const controller = require("../controllers/loginController");
const passport = require("passport");
const { preventLoggedIn } = require("./authMiddleware");

router.get("/", preventLoggedIn, controller.getLogin);
router.post("/", preventLoggedIn, passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
}));

module.exports = router;