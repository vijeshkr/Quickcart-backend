const addToCartModel = require('../../models/cartProduct');

const addToCartViewProduct = async (req,res) => {
    try {
        const currentUser = req.userId

        // Retrieve all products in the cart for the current user
        // The `find` method is used to query the database for documents with the specified userId
        // The `populate` method is used to replace the productId field with the actual product details from the referenced product collection
        const allProduct = await addToCartModel.find({
            userId : currentUser
        }).populate('productId');

        res.json({
            data : allProduct,
            message : 'Success'
        })
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}

module.exports = addToCartViewProduct;