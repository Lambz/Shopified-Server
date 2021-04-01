import express from "express";
import { Category } from "../models/category.model.mjs";
export const router = express.Router();

// GET all subCategories
router.get("/", async (req, res, next) => {
    try {
        const categories = await Category.find().populate("subCategories");
        res.json(categories);
    } catch (error) {
        res.status(400).json("Error: " + error);
        next(error);
    }
});

// POST add subCategory returns all the subCategories
router.post("/add", async (req, res, next) => {
    const name = req.body.name;
    const category = new Category({ label: name, value: name });
    try {
        await category.save();
        const categories = await Category.find().populate("subCategories");
        res.json(categories);
    } catch (err) {
        res.status(400).json("Error: " + err);
        next(err);
    }
});

// GET user by id
router.get("/:id", async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id).populate(
            "subCategories"
        );
        res.json(category);
    } catch (err) {
        res.status(400).json("Error: " + err);
        next(err);
    }
});

// DELETE user by ic returns all the subCategories
router.delete("/delete/:id", async (req, res, next) => {
    let id = req.params.id;
    Category.findOneAndRemove({ _id: id }, async (err, doc) => {
        if (err) {
            res.json({ Error: err });
        } else {
            const category = await Category.find().populate("subCategories");
            res.json(category);
        }
    });
});

// UPDATE user
router.post("/update/:id", async (req, res, next) => {
    const id = req.params.id;
    const name = req.body.name;
    Category.findOneAndUpdate(
        { _id: id },
        {
            label: name,
            value: name,
        },
        async (err, result) => {
            // console.log(err, result);
            if (err) {
                res.status(400).json({ Error: err });
            }
            const category = await Category.find().populate("subCategories");
            res.json(category);
        }
    );
});
