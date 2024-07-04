const express = require('express');
const userSignUp = require('../controller/userSignUp');

// Router object
const router = express.Router();

// User registration rout
router.post('/registration', userSignUp);






module.exports = router;