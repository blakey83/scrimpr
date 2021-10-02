const Joi = require('joi');
const express = require('express');
const groupMembers = require('./routes/groupMembers');
const app = express();
var cors = require('cors')

app.use(cors());
app.use(express.json());
app.use(express.static('staticstuff'));
app.use('/api/groupMembers', groupMembers);

app.listen(80, () => console.log('listening on port 3000...'));