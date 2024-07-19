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
const getOneCategoryProduct = require('../controller/product/getOneCategoryProduct');
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct');
const getProductDetails = require('../controller/product/getProductDetails');
const countAddToCartProduct = require('../controller/cart/countAddToCartProduct');
const addToCartController = require('../controller/cart/addToCart');
const addToCartViewProduct = require('../controller/cart/addToCartViewProduct');
const updateAddToCart = require('../controller/cart/updateAddToCart');
const deleteAddToCart = require('../controller/cart/deleteAddToCart');
const searchProduct = require('../controller/product/searchProduct');
const filterProduct = require('../controller/product/filterProduct');

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

// Get one product from each category
router.get('/get-oneCategory',getOneCategoryProduct);

// Get product categorywise
router.get('/category-product',getCategoryWiseProduct);

// Get product details for details page
router.post('/product-details',getProductDetails);

// Add to cart
router.post('/addtocart',authToken,addToCartController);

// Add to cart count
router.get('/countAddToCart',authToken,countAddToCartProduct);

// View add to cart products
router.get('/addtocart-products',authToken,addToCartViewProduct);

// Update add to cart
router.post('/update-cart',authToken,updateAddToCart);

// Delete product from cart
router.post('/delete-cart-product',authToken,deleteAddToCart);

// Search products
router.get('/search',searchProduct);

// Filter products
router.post('/filter-product',filterProduct);



module.exports = router;