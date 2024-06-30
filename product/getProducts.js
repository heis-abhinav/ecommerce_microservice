const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

router.get('/all', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
