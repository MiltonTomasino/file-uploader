const router = require("express").Router();
const controller = require("../controllers/registerController");
const { preventLoggedIn } = require("./authMiddleware");

router.get("/", preventLoggedIn, controller.getRegister);
router.post("/", preventLoggedIn, controller.registerUser);

module.exports = router;