const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const auth = require('./routes/auth');
const products = require('./routes/product');
const cart = require('./routes/cart');
const address = require('./routes/address');
const orders = require('./routes/orders');
const review = require('./routes/review');
const category = require('./routes/category');
const brand = require('./routes/brand');

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', auth);
app.use('/api/products', products);
app.use('/api/cart', cart);
app.use('/api/address', address);
app.use('/api/orders', orders);
app.use('/api/review', review);
app.use('/api/category', category);
app.use('/api/brand', brand);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

app.listen(PORT,'0.0.0.0', () => {
    console.log(`Server is running on port: ${PORT}`);
});
