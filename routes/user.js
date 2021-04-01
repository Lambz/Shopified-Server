const router = require("express").Router();
let User = require("../models/user.model");

// GET all users
router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(error => res.status(400).json("Error: " + error));
});

// POST add user
router.route("/add").post((req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const address = req.body.address;
    const phoneNo = req.body.phoneNo;
    const email = req.body.email;
    const password = req.body.password;
    const cart = req.body.cart;
    const orders = req.body.orders;

    const newUser = new User({id, name, address, phoneNo, email, password, cart, orders});

    newUser.save()
    .then(() => res.json("User Added"))
    .catch(err => res.status(400).json("Error: " + err));
});

// GET user by id
router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

// DELETE user by ic
router.route('/delete/:id').delete((req, res) => {
    User.findById(req.params.id)
    .then(() => res.json("User Deleted"))
    .catch(err => res.status(400).json('Error: ' + err));
});

// UPDATE user
router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
    .then(user => {
        user.id = req.body.id;
        user.name = req.body.name;
        user.address = req.body.address;
        user.phoneNo = req.body.phoneNo;
        user.email = req.body.email;
        user.password = req.body.password;
        user.cart = req.body.cart;
        user.orders = req.body.orders;

        user.save()
        .then(() => res.json('User Updated'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;