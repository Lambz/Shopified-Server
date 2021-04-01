import express from "express";
import { Category } from "../models/category.model.mjs";
import { SubCategory } from "../models/subCategory.model.mjs";
export const router = express.Router();

// GET all subCategories
router.get("/", async (req, res, next) => {
    try {
        const subCategories = await SubCategory.find();
        res.json(subCategories);
    } catch (error) {
        res.status(400).json("Error: " + error);
        next(error);
    }
});

// POST add subCategory returns all the subCategories
router.post("/add", async (req, res, next) => {
    const name = req.body.name;
    const categoryID = req.body.categoryID;
    let subCategory = new SubCategory({ label: name, value: name });
    // console.log(subCategory);
    try {
        await subCategory.save();
        const subCategories = await SubCategory.find();
        if (categoryID != null && categoryID != undefined) {
            let category = await Category.findById(categoryID).exec();
            console.log(category);
            let sc = [...category.subCategories, subCategory._id];
            console.log(sc);
            Category.findOneAndUpdate(
                { _id: category._id },
                {
                    subCategories: sc,
                },
                async (err, result) => {
                    // console.log(err, result);
                    if (err) {
                        res.status(400).json({ Error: err });
                    }
                    const subCategories = await SubCategory.find();
                    res.json(subCategories);
                }
            );
        } else {
            res.json(subCategories);
        }
    } catch (err) {
        res.status(400).json("Error: " + err);
        next(err);
    }
});

// DELETE user by ic returns all the subCategories
router.delete("/delete/:id", async (req, res, next) => {
    console.log("delete request");
    let id = req.params.id;
    SubCategory.findOneAndRemove({ _id: id }, async (err, doc) => {
        if (err) {
            res.json({ Error: err });
        } else {
            const subCategories = await SubCategory.find();
            res.json(subCategories);
        }
    });
});

// UPDATE user
router.post("/update/:id", async (req, res, next) => {
    const id = req.params.id;
    const subCategory = req.body.subCategory;
    SubCategory.findOneAndUpdate(
        { _id: id },
        {
            label: subCategory,
            value: subCategory,
        },
        (err, result) => {
            // console.log(err, result);
            if (err) {
                res.status(400).json({ Error: err });
            }
            res.json(result);
        }
    );
});
