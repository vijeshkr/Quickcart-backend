const orderModel = require('../../models/orderModel');

const orderHistory = async (req,res) => {
    try {
        const currentUser = req.userId;
        const orders = await orderModel.find({ userId : currentUser}).populate('orderItems.productId');
        res.status(200).json({
            data: orders,
            message: 'Ok'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = orderHistory;