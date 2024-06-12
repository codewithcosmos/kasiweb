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
        image: '/images/web-design.jpg'
    },
    {
        name: 'Web Development',
        description: 'Full-stack web development services to build robust and scalable web applications.',
        price: 10000,
        category: 'Web Development',
        image: '/images/web-development.jpg'
    },
    {
        name: 'Maintenance',
        description: 'Ongoing website maintenance services to ensure your website runs smoothly and securely.',
        price: 1500,
        category: 'Maintenance',
        image: '/images/maintenance.jpg'
    },
    {
        name: 'Hosting',
        description: 'Reliable web hosting services to keep your website online and accessible at all times.',
        price: 1500,
        category: 'Hosting',
        image: '/images/hosting.jpg'
    },
    {
        name: 'Domain Registration',
        description: 'Domain registration services to secure your unique web address.',
        price: 200,
        category: 'Domain Registrar',
        image: '/images/domain-registration.jpg'
    },
    {
        name: 'Company Registration',
        description: 'Services to help you register your company legally and efficiently.',
        price: 1200,
        category: 'Company Register',
        image: '/images/company-registration.jpg'
    },
    {
        name: 'Graphic Design',
        description: 'Creative graphic design services for branding, marketing materials, and more.',
        price: 2500,
        category: 'Graphic Design',
        image: '/images/graphic-design.jpg'
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
