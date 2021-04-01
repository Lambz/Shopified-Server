import express from "express";
export const router = express.Router();
import {Seller as Seller} from '../models/seller.model.mjs';

// GET all sellers
router.get('/', async (req, res, next) => {
    try {
        const sellers = await Seller.find();
        res.json(sellers);
    }
    catch(error) {
        res.status(400).json("Error: " + error);
        next(error);
    }
});

// ADD seller
router.post('/add', async (req, res, next) => {
    const id = req.body.id;
    const name = req.body.name;
    const company = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const products = req.body.products;

    const newSeller = Seller({_id: id, name: name, company: company, email: email, password: password, products: products});
    try {
        await newSeller.save();
        res.json("Seller Added");
    }
    catch(err) {
        res.status(400).json("Error: " + err);
        next(err);
    }
});

// GET seller by id
router.get('/:id', async (req, res, next) => {
    try {
        const seller = await Seller.findById(req.params.id);
        res.json(seller);
    }
    catch(err) {
        res.status(400).json('Error: ' + err)
        next(err);
    }
});

// DELETE seller by ic
router.delete('/delete/:id', async (req, res, next) => {
    try {
        await Seller.findById(req.params.id);
        res.json("Seller Deleted");
    }
    catch(err) {
        res.status(400).json('Error: ' + err);
        next(err);
    }
});

// UPDATE seller
router.post('/update/:id', async (req, res, next) => {
    try {
        const seller = await Seller.findById(req.params.id);
        seller.name = req.body.name;
        seller.company = req.body.company;
        seller.email = req.body.email;
        seller.password = req.body.password;
        seller.products = req.body.products;
        await seller.save();
        res.json('Seller Updated');
    }
    catch(err) {
        res.status(400).json('Error: ' + err);
        next(err);
    }
});

