const router = require("express").Router();
const controller = require("../controllers/uploadController");
const { isLoggedIn } = require("./authMiddleware");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "/Users/miltontomasino/Desktop/temp_files");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage });

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

module.exports = router;