const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Get product by ID or name
router.get('/:identifier', async (req, res) => {
    const { identifier } = req.params;

    try {
        let product;

        // Check if the identifier is a valid MongoDB ObjectID
        if (mongoose.Types.ObjectId.isValid(identifier)) {
            product = await Product.findById(identifier);
        }

        // If no product found by ID, or identifier is not a valid ObjectID, search by name
        if (!product) {
            product = await Product.findOne({ name: identifier });
        }

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
