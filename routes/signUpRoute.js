const router = require('express').Router();
const signUpController = require("../Controllers/signUpController");
const userSchema = require('../Schema/User_SchemaValidation');
const { verifyPasswordHash } = require('../middlewares/authMiddleware');
const { passwordsMatch, isNewUser, hashPassword } = require("../middlewares/signUpMiddleware");
const { validateBody } = require('../middlewares/validationMiddleware');

//SIGN UP NEW USER
router.post('/', validateBody(userSchema), passwordsMatch, isNewUser, hashPassword, signUpController.signUp);

module.exports = router;