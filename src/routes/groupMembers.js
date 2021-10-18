const { GroupMember, validate } = require('../models/groupMember');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const groupMembers = await GroupMember.find().sort('name');
    res.send(groupMembers);
});

router.get('/:name', async (req, res) => {
    const people = await GroupMember.find({ name: req.params.name });
    if (!people) return res.status(404).send('That person was not found');
    res.send(people);
});

router.post('/', async (req, res) => {
    const result = validate(req.body);
    const { error } = validate(req.body);
    if (error) return res.status(400).send(result.error.details[0].message);

    let people = new GroupMember({
        name: req.body.name,
        team: req.body.team
    });

    people = await people.save();
    res.send(people);
});

module.exports = router;