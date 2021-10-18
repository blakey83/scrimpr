const express = require('express');
const users = require('./users');
const router = express.Router();



const usersRoute = require('./users')

module.exports = (params => {
    router.get('/', async (req, res) => {
        return res.render('index'), { success: req.query.success };
     });
    
    router.get('/register', (req, res) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.render('register/register', );
    });
    
    router.get('/home', (req,res) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.render('home/home')
    })

    return router;
})




