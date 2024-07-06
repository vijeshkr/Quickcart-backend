const express = require('express');
const userSignUp = require('../controller/user/userSignUp');
const userSignIn = require('../controller/user/userSignIn');
const authToken = require('../middleware/authToken');
const userDetails = require('../controller/user/userDetails');
const userLogout = require('../controller/user/userLogout');

// Router object
const router = express.Router();

// User registration route
router.post('/registration', userSignUp);

// User login route
router.post('/login', userSignIn);

// Get user details
router.get('/user-details',authToken,userDetails);

// User logout
router.post('/logout',userLogout);






module.exports = router;