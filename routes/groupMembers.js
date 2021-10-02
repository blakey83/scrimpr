const Joi = require('joi');
const express = require('express');
const router = express.Router();


const groupMembers = [
    {id:1, name:'Jennifer', team:'Backend'},
    {id:2, name:'Mark', team:'Frontend'},
    {id:3, name:'Erin', team:'Frontend'},
    {id:4, name:'Daniel', team:'Backend'},
    {id:5, name:'Jordan', team:'Backend'},
    {id:6, name: 'Harrison', team:'Frontend'},
];


router.get('/', (req, res) =>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(groupMembers);
});

router.get('/:name', (req, res) =>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    const people = groupMembers.find(c=> c.name === req.params.name);
    if (!people) return res.status(404).send('That person was not found');
    res.send(people);
});

router.post('/', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const result = validatepeople(req.body);
    const { error } = validatepeople(req.body);
    if (error) return res.status(400).send(result.error.details[0].message);

    const people = {
        id: groupMembers.length +1,
        name: req.body.name,
        team: req.body.team     
    };

    groupMembers.push(people);
    res.send(people);
});

function validatepeople(course) {
    const schema = {
        name: Joi.string().min(3).required(),
        team: Joi.string().required().valid('Backend','Frontend')
    };

    return Joi.validate(course, schema);
};

module.exports = router;