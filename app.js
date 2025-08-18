const express = require("express");
const expressSession = require("express-session");
const indexRouter = require("./routes/index");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

app.listen(3000, () => {
    console.log("Listening on port 3000.");
})