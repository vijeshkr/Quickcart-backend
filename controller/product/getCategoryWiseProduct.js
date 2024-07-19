const productModel = require('../../models/productModel');

const getCategoryWiseProduct = async (req, res) => {
    try {
        const { category } = req?.query || req?.body
        const product = await productModel.find({ category });
        return res.status(200).json({ message: 'Products', data: product });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports = getCategoryWiseProduct;