const router = require("express").Router();
const controller = require("../controllers/uploadController");
const { isLoggedIn } = require("./authMiddleware");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

router.get("/", isLoggedIn, controller.getHomePage);

router.post("/upload-file", upload.single("file"), controller.uploadFile);

router.get("/log-out", (req, res, next) => {
    req.logOut(function (err) {
        if (err) return next(err);
        req.session.destroy(err => {
            if (err) console.error("Session destroy error: ", err);
            res.redirect("/log-in");
        })
    })
})

router.post("/create-folder", isLoggedIn, controller.createFolder);

router.get("/download/:id", controller.downloadFile);

module.exports = router;