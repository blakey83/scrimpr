const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const groupMembers = require('./routes/groupMembers');
const users = require('./routes/users')
const app = express();
var cors = require('cors')

mongoose.connect('mongodb+srv://Scrimpr_Admin:kaRzAy68Vh9hR6sq@cluster0.otxks.mongodb.net/ScrimprApp')
    .then(() => console.log('connecting to MongoDB...'))
    .catch(err => console.error('could not connect to MongoDB', err));

app.use(cors());
app.use(express.json());
app.use(express.static('staticstuff'));
app.use('/api/groupMembers', groupMembers);
app.use('/api/users', users);

const port = process.env.PORT || 80;
app.listen(port, () => console.log(`Listening on port ${port}...`));