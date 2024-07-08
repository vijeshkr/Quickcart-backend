const updateProductPermission = require('../../helpers/permissions');
const productModel = require('../../models/productModel');

const updateProductController = async (req, res) => {
    try {
        // Check if the user(admin or not) has permission to update the product
        if(!updateProductPermission){
            res.status(403).json({message: 'Permission denied'});
        }

        const {_id, ...resBody } = req.body;

        // Update the product in the database
        const updateProduct = await productModel.findByIdAndUpdate(_id, resBody, {new: true});

        // Respond with updated product details
        res.status(200).json({message: 'Product updated successfully', data: updateProduct});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

module.exports = updateProductController;