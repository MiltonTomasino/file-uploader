const express = require("express");
const expressSession = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("./generated/prisma");
const uploadRouter = require("./routes/upload");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const passport = require("passport");
require("dotenv").config();
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

require("./passport");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use(expressSession({
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(
        new PrismaClient(),
        {
            checkPeriod: 1000 * 60 * 2,
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }
    )
}))

app.use(passport.initialize());
app.use(passport.session());

app.use("/", uploadRouter);
app.use("/log-in", loginRouter);
app.use("/register", registerRouter);

app.listen(3000, () => {
    console.log("Listening on port 3000.");
})