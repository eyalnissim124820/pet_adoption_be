const Ajv = require('ajv');
const { getUserByEmail } = require('../models/usersModel');
const ajv = new Ajv();

function validateBody(schema) {
    return (req, res, next) => {
        const valid = ajv.validate(schema, req.body);
        if (!valid) {
            res.status(400).send(ajv.errors);
            return;
        }
        next();
    };
}


async function doesUserExist(req, res, next) {
    try {
        const user = await getUserByEmail(req.body.email)
        if (!user) {
            res.status(400).send("User doesn't exists");
            return;
        }
        req.body.user = user;
        next();
    } catch (error) {
        console.log(error)
    }
}

module.exports = { validateBody, doesUserExist }