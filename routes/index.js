const router = require("express").Router();
const controller = require("../controllers/indexController");

router.get("/", controller.getHomePage);

module.exports = router;