const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config()

async function verifyPasswordHash(req, res, next) {
    const { user, password } = req.body;
    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
            const token = jwt.sign({ id: user._id, user_role: user.user_role, user_name: user.first_name }, process.env.REACT_APP_TOKEN_KEY, { expiresIn: "5h" });
            req.body.token = token
            next();
        } else {
            res.status(400).send("Incorrect Password");
        }
    })
}


const verifyJWT = (req, res, next) => {
    const token = req.headers.authorization.replace('Bearer ', '');
    jwt.verify(token, process.env.REACT_APP_TOKEN_KEY, (error, decoded) => {
        if (decoded) {
            req.body.userId = decoded.id;
            req.body.user_role = decoded.user_role;
            req.body.user_name = decoded.user_name;
            next();
        }
        if (error) {
            res.status(403).console.log('Token is invalid');
        }
    });
}

module.exports = { verifyPasswordHash, verifyJWT }