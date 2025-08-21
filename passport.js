const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();
const utils = require("./controllers/utils")

passport.use(new LocalStrategy(
    { usernameField: "username" },
    async (username, password, done) => {
        try {
            const user = await prisma.user.findUnique({
                where: { username }
            });

            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            }

            const isValid = utils.validatePassword(password, user.password);

            if (!isValid) {
                return done(null, false, { message: "invalid password"})
            }

            return done(null, user);

        } catch (error) {
            console.error("Error: ", error);
            return done(error)
        }
    }
))

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id }
        })
        done(null, user);
    } catch (error) {
        done(error)
    }
})