const addToCartModel = require('../../models/cartProduct');

const addToCartController = async (req,res) => {
    try {
        const {productId} = req?.body
        const currentUser = req.userId

        // Check if the product is already in the user's cart
        const isProductAvailable = await addToCartModel.findOne({ productId, userId : currentUser });

        if(isProductAvailable){
            return res.json({
                message : 'Already added in the cart'
            });
        }

        // Create a new product object to add to the cart
        const product = {
            productId : productId,
            quantity : 1,
            userId : currentUser,
        }

        const newProduct = new addToCartModel(product);
        const saveProduct = await newProduct.save();

        return res.json({
            message : 'Product Added in Cart',
            data : saveProduct
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = addToCartController;