const deleteProductPermission = require('../../helpers/permissions');
const productModel = require('../../models/productModel');

const deleteProduct = async (req, res) => {
    try {
        // Check if the user (admin or not) has permission to delete the product
        if (!deleteProductPermission(req.userId)) {
            return res.status(403).json({ message: 'Permission denied' });
        }

        const { _id } = req.params;

        // Find and delete the product from the database
        const deletedProduct = await productModel.findByIdAndDelete(_id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Respond with a success message
        res.status(200).json({ message: 'Product deleted successfully', data: deletedProduct });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = deleteProduct;
