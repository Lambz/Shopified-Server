const router = require("express").Router();
let Seller = require("../models/seller.model");

router.route('/').get((req, res) => {
    Seller.find()
    .then(sellers => res.json(sellers))
    .catch(error => res.status(400).json("Error: " + error));
});

router.route('/add').get((req, res) => {
    const name = req.body.name;
    const company = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const products = req.body.products;

    const newSeller = Seller({name, company, email, password, products});

    newSeller.save()
    .then(() => res.json("Seller Added"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;