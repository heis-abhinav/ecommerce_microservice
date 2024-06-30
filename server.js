const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Import routes
const registerRoute = require('./auth/register');
const loginRoute = require('./auth/login');
const authMiddleware = require('./middleware/authMiddleware');
const createProductRoute = requier('./product/createProduct');
const getProductsRoute = require('./product/getProducts');
const updateProductRoute = require('./product/updateProduct');
const deleteProductRoute = require('./product/deleteProduct');
const getProductRoute = require('./product/getProduct');
const createOrderRoute = require('./order/createOrder');
const getOrdersRoute = require('./order/getOrders');
const getOrderRoute = require('./order/getOrder');
const updateOrderRoute = require('./order/updateOrder');
const deleteOrderRoute = require('./order/deleteOrder'); 

// Use routes
app.use('/api/users', registerRoute);
app.use('/api/users', loginRoute);
app.use('/api/products', createProductRoute);
app.use('/api/products', getProductsRoute);
app.use('/api/products', updateProductRoute);
app.use('/api/products', deleteProductRoute);
app.use('/api/products', getProductRoute);
app.use('/api/orders', createOrderRoute);
app.use('/api/orders', getOrdersRoute);
app.use('/api/orders', getOrderRoute);
app.use('/api/orders', updateOrderRoute);
app.use('/api/orders', deleteOrderRoute);

// Protected route example
app.get('/api/protected', authMiddleware, (req, res) => {
    res.send('This is a protected route');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
