const router = require('express').Router();
const UserController = require('../Controllers/userController')
const { checkIfAvialble } = require("../middlewares/petsMiddleware")

//ADOPT
router.post('/', checkIfAvialble, UserController.useAdoptPet)


module.exports = router;

