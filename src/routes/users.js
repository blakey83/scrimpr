import { Router } from 'express';
import { User } from '../models/user.js';

const router = Router();

router.get('/', async (req, res) =>{
    const Users = await User.find().sort('firstName');
    res.send(Users);
});

router.get('/:email', async (req, res) =>{
    const Users = await User.find({ email: req.params.email });
    if (!Users) return res.status(404).send('That person was not found');
    res.send(Users);
});

export {
    router,
}