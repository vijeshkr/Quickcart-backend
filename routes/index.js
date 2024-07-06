const express = require('express');
const userSignUp = require('../controller/user/userSignUp');
const userSignIn = require('../controller/user/userSignIn');
const authToken = require('../middleware/authToken');
const userDetails = require('../controller/user/userDetails');
const userLogout = require('../controller/user/userLogout');
const allUsers = require('../controller/user/allUser');
const updateUser = require('../controller/user/updateUser')

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

// All users data
router.get('/all-users',authToken,allUsers);

// Update user data
router.post('/update-user',authToken,updateUser);






module.exports = router;