require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');
const cartRoutes = require('./routes/cartRoutes');
const quoteRoutes = require('./routes/quotes');
const invoiceRoutes = require('./routes/invoices');
const productsRouter = require('./routes/products');

const app = express();

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine to EJS
app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
    console.error('MongoDB connection string is not defined');
    process.exit(1); // Exit the application
}

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Initialize session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

// Routes
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Products routes
app.use('/products', productsRouter);

// Cart routes
app.use('/cart', cartRoutes);

// Quotes routes
app.use('/quotes', quoteRoutes);

// Invoices routes
app.use('/invoices', invoiceRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
