const router = require("express").Router();
let User = require("../models/user.model");

router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(error => res.status(400).json("Error: " + error));
});

router.route("/add").post((req, res) => {
    const name = req.body.name;
    const address = req.body.address;
    const phoneNo = req.body.phoneNo;
    const email = req.body.email;
    const password = req.body.password;
    const cart = req.body.cart;
    const orders = req.body.orders;

    const newUser = new User({name, address, phoneNo, email, password, cart, orders});

    newUser.save()
    .then(() => res.json("User Added"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;