const addToCartModel = require('../../models/cartProduct');

const countAddToCartProduct = async (req,res) => {
    try {
        const userId = req.userId;

        const count = await addToCartModel.countDocuments({
            userId: userId
        });

        res.status(200).json({
            message: 'Ok',
            data: {
                count: count
            }
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}

module.exports = countAddToCartProduct;