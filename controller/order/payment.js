const stripe = require('../../config/stripe');

const paymentController = async (req, res) => {
    try {

        const currentUser = req.userId;
        const { cartItems } = req.body;

        const cartId = cartItems.length > 0 ? cartItems[0]._id : null

        const lineItems = cartItems.map((item) => (
            {

                price_data: {
                    currency: "inr",
                    product_data: {
                        name: item.productId.productName,
                    },
                    unit_amount: item.productId.sellingPrice * 100,
                },
                quantity: item.quantity,
            }));


        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
            metadata: {
                userId: currentUser,
                cartItems: cartId,
            },
        });

        res.status(200).json({
            id: session.id
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = paymentController;