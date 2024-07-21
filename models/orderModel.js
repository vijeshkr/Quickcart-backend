const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    orderItems: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
            name: String,
            qty: Number,
            price: Number,
        }
    ],
    totalPrice: Number,
    isPaid: { type: Boolean, default: false },
    paidAt: Date,
});

const orderModel = mongoose.model('orderModel', orderSchema);

module.exports = orderModel;
