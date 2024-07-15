const express = require('express');
const { signUpController, loginController } = require('../controller/userController');
const router = express.Router();

router.post('/signup',signUpController);
router.get('/login',loginController);

module.exports = router;