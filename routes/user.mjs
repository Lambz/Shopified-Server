import express from 'express';
export const router = express.Router();
import {User as User} from '../models/user.model.mjs';

// GET all users
router.get('/', async (req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch(error) {
        res.status(400).json('Error: ' + error);
        next(error);
    }
});

// POST add user
router.post('/add', async (req, res, next) => {
    const id = req.body.id;
    const name = req.body.name;
    const address = req.body.address;
    const phoneNo = req.body.phoneNo;
    const email = req.body.email;
    const password = req.body.password;
    const cart = req.body.cart;
    const orders = req.body.orders;

    const newUser = new User({id, name, address, phoneNo, email, password, cart, orders});
    try {
        await newUser.save();
        newUser.save();
    }
    catch(err) {
        res.status(400).json('Error: ' + err);
        next(err);
    }
});

// GET user by id
router.get('/:id', async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    }
    catch(err) {
        res.status(400).json('Error: ' + err);
        next(err);
    }
});

// DELETE user by ic
router.delete('/delete/:id', async (req, res, next) => {
    try {
        await User.findById(req.params.id);
        res.json('User Deleted');
    }
    catch(err) {
        res.status(400).json('Error: ' + err);
        next(err);
    }
});

// UPDATE user
router.post('/update/:id', async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        user.name = req.body.name;
        user.address = req.body.address;
        user.phoneNo = req.body.phoneNo;
        user.email = req.body.email;
        user.password = req.body.password;
        user.cart = req.body.cart;
        user.orders = req.body.orders;
        await user.save();
        res.json('User Updated');
    }
    catch(err) {
        res.status(400).json('Error: ' + err);
        next(err);
    }
});
