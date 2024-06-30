const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product'); // Import Product model
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', authMiddleware, async (req, res) => {
    const { userId, products } = req.body;

    try {
        // Calculate total amount and update product quantities
        let totalAmount = 0;

        for (const { productId, quantity } of products) {
            const product = await Product.findById(productId);

            if (!product) {
                return res.status(404).json({ msg: 'Product not found' });
            }

            if (product.quantity < quantity) {
                return res.status(400).json({ msg: 'Insufficient quantity for product ' + product.name });
            }

            product.quantity -= quantity; // Subtract ordered quantity from available quantity
            await product.save();

            totalAmount += product.price * quantity;
        }

        const newOrder = new Order({
            userId,
            products,
            totalAmount
        });

        const order = await newOrder.save();
        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
