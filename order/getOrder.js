const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

// GET order by ID or user ID
router.get('/:identifier', async (req, res) => {
    const { identifier } = req.params;
    const userIdRegex = /^[0-9a-fA-F]{24}$/; // MongoDB ObjectId regex

    try {
        let order;

        // Check if identifier matches MongoDB ObjectId format
        if (userIdRegex.test(identifier)) {
            // Find order by order ID
            order = await Order.findById(identifier);
        } else {
            // Find orders by user ID
            order = await Order.find({ userId: identifier });
        }

        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }

        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
