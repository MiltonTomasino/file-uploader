const bcrypt = require("bcrypt");
const saltRounds = 10;

async function generatePassword(password) {
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    } catch (error) {
        console.error("Error hashing password: ", error);
        
    }
}

async function validatePassword(password, storedPassword) {
    return bcrypt.compare(password, storedPassword);
}

module.exports =  {
    validatePassword,
    generatePassword
}