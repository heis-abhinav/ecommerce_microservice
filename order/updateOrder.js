const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product'); // Import Product model
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.put('/update/:id', authMiddleware, async (req, res) => {
    const { products } = req.body;

    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }

        // Restore previous product quantities
        for (const { productId, quantity: newQuantity } of order.products) {
            const product = await Product.findById(productId);

            if (!product) {
                return res.status(404).json({ msg: 'Product not found' });
            }

            product.quantity += newQuantity; // Restore previous quantity
            await product.save();
        }

        // Update order with new products and calculate total amount
        order.products = products;
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

        order.totalAmount = totalAmount;

        await order.save();
        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
