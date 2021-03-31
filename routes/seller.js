const router = require("express").Router();
let Seller = require("../models/seller.model");

router.route('/').get((req, res) => {
    Seller.find()
    .then(sellers => res.json(sellers))
    .catch(error => res.status(400).json("Error: " + error));
});



module.exports = router;