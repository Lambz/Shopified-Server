import express from "express";
import { Order } from "../models/order.model.mjs";
import { Product } from "../models/product.model.mjs";
export const router = express.Router();
import { User as User } from "../models/user.model.mjs";

// GET all users
router.get("/", async (req, res, next) => {
    try {
        const users = await User.find().populate({
            path: "cart",
            populate: "product",
        });
        // await users.cart.populate("product");
        res.json(users);
    } catch (error) {
        res.status(400).json({ Error: error });
        next(error);
    }
});

// POST add user
router.post("/add", async (req, res, next) => {
    const id = req.body._id;
    const name = req.body.name;
    const address = req.body.address;
    const phoneNo = req.body.phoneNo;
    const email = req.body.email;
    const password = req.body.password;
    const cart = req.body.cart;
    const orders = req.body.orders;

    const newUser = new User({
        _id: id,
        name: name,
        address: address,
        phoneNo: phoneNo,
        email: email,
        password: password,
        cart: cart,
        orders: orders,
    });
    try {
        await newUser.save();
        res.json("User Added");
    } catch (err) {
        res.status(400).json("Error: " + err);
        next(err);
    }
});

// GET user by id
router.get("/:id", async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).populate({
            path: "cart",
            populate: "product",
        });
        res.json(user);
    } catch (err) {
        res.status(400).json("Error: " + err);
        next(err);
    }
});

// DELETE user by ic
router.delete("/delete/:id", async (req, res, next) => {
    try {
        await User.findOneAndRemove(
            { _id: req.params.id },
            async (err, doc) => {
                if (err) {
                    res.json({ Error: err });
                }
                res.json({ Success: true });
            }
        );
    } catch (err) {
        res.status(400).json("Error: " + err);
        next(err);
    }
});

// UPDATE user
router.post("/update/:id", async (req, res, next) => {
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
        res.json("User Updated");
    } catch (err) {
        res.status(400).json("Error: " + err);
        next(err);
    }
});

router.post("/addOrder/:id", async (req, res, next) => {
    const user = await User.findById(req.params.id);
    const products = req.body.products;
    try {
        if (products == null || products == undefined) {
            products = user.products;
            user.products = [];
        }
        products.forEach(async (proudct) => {
            let p = Product.findById(proudct.product);
            p.quantity = p.quantity - proudct.quantity;
            await p.save();
        });
        let newOrder = new Order(user, products, 0);
        await newOrder.save();
        user.orders([...user.orders, newOrder]);
        await user.save();
        res.json({ Success: true });
    } catch (err) {
        res.status(400).json({ Error: err });
        next(err);
    }
});
