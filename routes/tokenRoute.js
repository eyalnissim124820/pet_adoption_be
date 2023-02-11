const { verifyJWT } = require('../middlewares/authMiddleware');

const router = require('express').Router();

router.get('/', verifyJWT, (req, res) => {
    const info = {
        userId: req.body.userId,
        user_role:req.body.user_role,
        user_name: req.body.user_name
    }
    res.send(info)
})

module.exports = router