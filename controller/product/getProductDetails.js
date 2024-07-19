const productModel = require('../../models/productModel');

const getProductDetails = async (req,res) => {
    try {
        
        const { productId } = req.body ;

        const product = await productModel.findById(productId);

        return res.status(200).json({message:'Product details', data:product});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

module.exports = getProductDetails;