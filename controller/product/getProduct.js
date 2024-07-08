const productModel = require('../../models/productModel');

const getProduct = async (req,res) => {
    try {
        // Fetch all products from the database, sorted by creation date in descending order
        const allProducts = await productModel.find().sort({ createdAt: -1 });

        // Respond with fetched products
        res.status(200).json({message: 'All Products', data: allProducts});
    } catch (error) {
        res.status(500).json({message: error.message});
        console.log('Error while fetching')
    }
}

module.exports = getProduct;