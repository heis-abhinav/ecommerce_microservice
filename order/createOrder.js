const express = require('express');
const Order = require('../models/Order');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', authMiddleware, async (req, res) => {
    const { userId, products, totalAmount } = req.body;

    try {
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
