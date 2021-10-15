// 3rd-party dependencies
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
// Relative imports
const groupMembers = require('./routes/groupMembers');
const products = require('./routes/products');
const users = require('./routes/users');

// Load environment variables from .env
dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

// Set up express router
const app = express();
app.use(cors()); // disable cors
app.use(express.json()); // enable JSON request body support
// conditionally load env-specific assets
const isProduction = process.env.NODE_ENV === 'production';
app.use('/env.js', express.static(isProduction ? 'src/static/env.prod.js' : 'src/static/env.js'));
// serve static files from src/static directory
app.use(express.static('src/static'));

// Initialise routes
app.use('/api/groupMembers', groupMembers);
app.use('/api/products', products);
app.use('/api/users', users);

// Start HTTP listener
const port = Number(process.env.PORT || 80);
app.listen(port, () => console.log(`Listening on port ${port}...`));