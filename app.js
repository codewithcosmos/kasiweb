const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const dotenv = require('dotenv');
const nodemailerConfig = require('./nodemailerConfig');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

// Set view engine
app.set('view engine', 'ejs');

// Routes
const homeRoute = require('./routes/home');
const contactRoute = require('./routes/contact');
const quoteRoute = require('./routes/quotes');
const serviceRoute = require('./routes/services');
const blogRoute = require('./routes/blog');
const adminRoute = require('./routes/admin');

app.use('/', homeRoute);
app.use('/contact', contactRoute);
app.use('/quotes', quoteRoute);
app.use('/services', serviceRoute);
app.use('/blog', blogRoute);
app.use('/admin', adminRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
