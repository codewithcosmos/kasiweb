require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Your other middleware and route setup

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI;
app.get('/', (req, res) => {
  res.send('Hello World, This is my first app');
});


if (!mongoUri) {
    console.error('MongoDB connection string is not defined');
    process.exit(1); // Exit the application
}

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
