const {User, validate} = require('../models/user');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) =>{
    const Users = await User.find().sort('firstName');
    res.send(Users);
});
router.get('/:email', async (req, res) =>{
    const Users = await User.find({ email: req.params.email });
    if (!Users) return res.status(404).send('That person was not found');
    res.send(Users);
});

router.post('/', async (req, res) => {
    const result = validate(req.body);
    const { error } = validate(req.body);
    if (error) return res.status(400).send(result.error.details[0].message);

    let users = new User ({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        postcode: req.body.postcode,
        email: req.body.email,
        password: req.body.password,
    });

    users = await users.save();
    res.send(users);
});

module.exports = router;