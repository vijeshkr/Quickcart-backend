const addToCartModel = require('../../models/cartProduct');

const deleteAddToCart = async(req, res) => {
    try {
        const currentUser = req.userId;
        const addToCartProductId = req.body._id

        const deleteProduct = await addToCartModel.deleteOne({ _id : addToCartProductId, userId : currentUser});

        res.json({
            message : 'Product deleted',
            data : deleteProduct
        })

    } catch(error) {
        res.json({
            message : error.message
        })
    }
}

module.exports = deleteAddToCart;