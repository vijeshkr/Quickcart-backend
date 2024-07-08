const express = require('express');
const userSignUp = require('../controller/user/userSignUp');
const userSignIn = require('../controller/user/userSignIn');
const authToken = require('../middleware/authToken');
const userDetails = require('../controller/user/userDetails');
const userLogout = require('../controller/user/userLogout');
const allUsers = require('../controller/user/allUser');
const updateUser = require('../controller/user/updateUser');
const { newProduct } = require('../controller/product/uploadProduct');
const getProduct = require('../controller/product/getProduct');
const updateProductController = require('../controller/product/updateProduct');
const deleteProduct = require('../controller/product/deleteProduct');

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

// Upoload new product
router.post('/products', newProduct);

// Get products
router.get('/get-product',getProduct);

// Update product
router.post("/update-product",authToken,updateProductController);

// Delete product
router.delete("/products/:_id",authToken,deleteProduct);




module.exports = router;