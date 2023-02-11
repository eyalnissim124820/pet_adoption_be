const { addNewUser } = require('../models/usersModel')


const signUp = (req, res) => {
    try {
        const formUser = req.body;
        const newUser = {
            ...formUser,
            saved_pets: [],
            adopted_pets: [],
            fostered_pets: [],
        }
        const addedUser = addNewUser(newUser);
        if (addedUser) {
            res.send(newUser)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
};



module.exports = { signUp }