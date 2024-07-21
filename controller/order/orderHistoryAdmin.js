const orderModel = require('../../models/orderModel');

const orderHistoryAdmin = async (req,res) => {
    try {
        const orders = await orderModel.find().populate('orderItems.productId');
        
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

module.exports = orderHistoryAdmin;