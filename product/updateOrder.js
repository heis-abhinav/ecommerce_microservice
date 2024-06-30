const express = require('express');
const Order = require('../models/Order');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.put('/update/:id', authMiddleware, async (req, res) => {
    const { products, totalAmount, status } = req.body;

    try {
        let order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }

        order.products = products;
        order.totalAmount = totalAmount;
        order.status = status;

        await order.save();
        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
