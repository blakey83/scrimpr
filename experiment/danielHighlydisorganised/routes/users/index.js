const User = require('../../models/user');
const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
const router = express.Router();

router.post('/login', passport.authenticate( 'local', {
    successRedirect: '../home',
    failureRedirect: '../?error=true',
}));

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


router.post('/', async (req, res, next  ) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    try {
        const user = new User ({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            postcode: req.body.postcode,
            email: req.body.email,
            password: req.body.password    
        });
        const password = req.body.password
        const password2 = req.body.passwordrepeat
        if (password === password2){
            users = await user.save();
            res.redirect('../'); 
        }
        else {
            res.redirect('./register')
            return next();
    }
}
    catch (e) {
        console.error(e);
    }
});
    



module.exports = router;