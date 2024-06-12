// seed.js
const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

const products = [
    {
        name: 'Web Design',
        description: 'Professional web design services to create visually appealing and user-friendly websites.',
        price: 5000,
        category: 'Web Design',
        image: 'https://via.placeholder.com/300x200.png?text=Web+Design'
    },
    {
        name: 'Web Development',
        description: 'Full-stack web development services to build robust and scalable web applications.',
        price: 10000,
        category: 'Web Development',
        image: 'https://via.placeholder.com/300x200.png?text=Web+Development'
    },
    {
        name: 'Maintenance',
        description: 'Ongoing website maintenance services to ensure your website runs smoothly and securely.',
        price: 1500,
        category: 'Maintenance',
        image: 'https://via.placeholder.com/300x200.png?text=Maintenance'
    },
    {
        name: 'Hosting',
        description: 'Reliable web hosting services to keep your website online and accessible at all times.',
        price: 2000,
        category: 'Hosting',
        image: 'https://via.placeholder.com/300x200.png?text=Hosting'
    },
    {
        name: 'Domain Registration',
        description: 'Domain registration services to secure your unique web address.',
        price: 200,
        category: 'Domain Registrar',
        image: 'https://via.placeholder.com/300x200.png?text=Domain+Registration'
    },
    {
        name: 'Company Registration',
        description: 'Services to help you register your company legally and efficiently.',
        price: 1200,
        category: 'Company Register',
        image: 'https://via.placeholder.com/300x200.png?text=Company+Registration'
    },
    {
        name: 'Graphic Design',
        description: 'Creative graphic design services for branding, marketing materials, and more.',
        price: 2500,
        category: 'Graphic Design',
        image: 'https://via.placeholder.com/300x200.png?text=Graphic+Design'
    }
];

Product.insertMany(products)
    .then(() => {
        console.log('Products added successfully');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Error adding products', err);
        mongoose.connection.close();
    });
