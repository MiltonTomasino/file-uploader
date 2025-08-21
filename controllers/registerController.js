const { PrismaClient } = require("../generated/prisma");
const utils = require("../controllers/utils");
const prisma = new PrismaClient();

module.exports.getRegister = (req, res) => {
    res.render("register", { title: "Register" });
}

module.exports.registerUser = async (req, res) =>{
    const { username, password } = req.body;
    const hashedPassword = await utils.generatePassword(password);

    try {
        await prisma.user.create({
            data: {
                username: username,
                password: hashedPassword
            }
        })
        res.redirect("/");
    } catch (error) {
        console.error("Error registering user: ", error);
        
    }
}