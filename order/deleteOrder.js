const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product'); // Import Product model
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.delete('/delete/:id', authMiddleware, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }

        // Restore product quantities
        for (const { productId, quantity } of order.products) {
            const product = await Product.findById(productId);

            if (!product) {
                return res.status(404).json({ msg: 'Product not found' });
            }

            product.quantity += quantity; // Restore previous quantity
            await product.save();
        }

        await order.remove();
        res.json({ msg: 'Order removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
