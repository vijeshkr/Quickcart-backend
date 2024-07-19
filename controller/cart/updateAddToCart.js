const addToCartModel = require('../../models/cartProduct');

const updateAddToCart = async (req,res) => {
    try {
        const currentUser = req.userId;
        const addToCartProductId = req?.body?._id;

        const qty = req.body.quantity;

        const updateProduct = await addToCartModel.updateOne({_id : addToCartProductId, userId : currentUser},{
            ...(qty && {quantity : qty})
        });

        res.json({
            message : 'Product Updated',
            data : updateProduct
        })
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}

module.exports = updateAddToCart;