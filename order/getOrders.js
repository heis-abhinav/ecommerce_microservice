const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

router.get('/all', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
