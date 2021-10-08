const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) =>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    const Users = await User.find().sort('firstname');
    res.send(Users);
});
router.get('/:Email', async (req, res) =>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    const Users = await User.find({Email: req.params.Email});
    if (!Users) return res.status(404).send('That person was not found');
    res.send(Users);
});

router.post('/', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const result = validate(req.body);
    const { error } = validate(req.body);
    if (error) return res.status(400).send(result.error.details[0].message);

    let users = new User ({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        postcode: req.body.postcode,
        Email: req.body.Email,
        password: req.body.password    
    });

    users = await users.save();
    res.send(users);
});

module.exports = router;