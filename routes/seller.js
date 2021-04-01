const router = require("express").Router();
let Seller = require("../models/seller.model");

// GET all sellers
router.route('/').get((req, res) => {
    Seller.find()
    .then(sellers => res.json(sellers))
    .catch(error => res.status(400).json("Error: " + error));
});

// ADD seller
router.route('/add').get((req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const company = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const products = req.body.products;

    const newSeller = Seller({id, name, company, email, password, products});

    newSeller.save()
    .then(() => res.json("Seller Added"))
    .catch(err => res.status(400).json("Error: " + err));
});

// GET seller by id
router.route('/:id').get((req, res) => {
    Seller.findById(req.params.id)
    .then(seller => res.json(seller))
    .catch(err => res.status(400).json('Error: ' + err));
});

// DELETE seller by ic
router.route('/delete/:id').delete((req, res) => {
    Seller.findById(req.params.id)
    .then(() => res.json("Seller Deleted"))
    .catch(err => res.status(400).json('Error: ' + err));
});

// UPDATE seller
router.route('/update/:id').post((req, res) => {
    Seller.findById(req.params.id)
    .then(seller => {
        seller.id = req.body.id;
        seller.name = req.body.name;
        seller.company = req.body.company;
        seller.email = req.body.email;
        seller.password = req.body.password;
        seller.products = req.body.products;
  
        seller.save()
        .then(() => res.json('Seller Updated'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;