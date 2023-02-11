const router = require('express').Router();

const loginSchema = require('../Schema/loginSchema');
const { verifyPasswordHash, login } = require('../middlewares/authMiddleware');
const { validateBody, doesUserExist } = require('../middlewares/validationMiddleware');
const userController = require("../Controllers/userController");

router.post('/', validateBody(loginSchema), doesUserExist, verifyPasswordHash, userController.login);

module.exports = router;