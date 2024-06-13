require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');

const cartRoutes = require('./routes/cartRoutes');
const quoteRoutes = require('./routes/quoteRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const productsRouter = require('./routes/products');

const path = require('path');
const app = express();

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine to EJS
app.set('view engine', 'ejs');

// Session middleware
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
    console.error('MongoDB connection string is not defined');
    process.exit(1); // Exit the application
}

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Routes
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Products routes
app.use('/products', productsRouter);

// Cart routes
app.use('/cart', cartRoutes);

// Quote routes
app.use('/quote', quoteRoutes);

// Invoice routes
app.use('/invoice', invoiceRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
