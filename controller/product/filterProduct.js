const productModel = require('../../models/productModel');

const filterProduct = async (req,res) => {
    try {
        const categoryList = req?.body?.category || []

        const product = await productModel.find({
            category : {
                '$in' : categoryList
            }
        })

        res.json({
            message : 'Products',
            data : product
        })
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}

module.exports = filterProduct;