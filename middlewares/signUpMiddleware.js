const bcrypt = require("bcrypt")
const { getUserByEmail } = require("../models/usersModel");

function passwordsMatch(req, res, next) {
    if (req.body.password !== req.body.password_confirm) {
        res.status(400).send("Passwords do NOT match");
        return;
    }
    next();
}

async function isNewUser(req, res, next) {
    const user = await getUserByEmail(req.body.email)
    if (user) {
        res.status(400).send("User Already exists");
        return;
    }
    next();
}

async function hashPassword(req, res, next) {
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) {
            res.status(500).send(err.message);
        }else{
            req.body.password = hash;
            next();
        }
    })
}


module.exports = { passwordsMatch, isNewUser , hashPassword }