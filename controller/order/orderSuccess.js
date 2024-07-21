const stripe = require('../../config/stripe');
const addToCartModel = require('../../models/cartProduct');
const orderModel = require('../../models/orderModel');

const orderSuccess = async (req, res) => {

    const { sessionId } = req.body;
    console.log(sessionId)
    

    try {

        // Retrieve the session from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        const userId = session.metadata.userId;
        const cartId = session.metadata.cartItems;


        // Fetch the cart from the database
        const cart = await addToCartModel.find({userId}).populate('productId');
        
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Create a new order
        const order = new orderModel({
            userId,
            orderItems: cart.map(item => ({
                productId: item.productId._id,
                name: item.productId.productName,
                qty: item.quantity,
                price: item.productId.sellingPrice,
            })),
            totalPrice: session.amount_total / 100,
            isPaid: true,
            paidAt: new Date(),
        });

        // Save the order
        await order.save();

        // Clear the cart
        await addToCartModel.deleteMany({userId : userId});

        res.status(200).json({ message: 'Order created and cart cleared' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = orderSuccess;