import express from "express";
import { Product } from "../models/product.model.mjs";
import { Seller } from "../models/seller.model.mjs";
export const router = express.Router();

// GET all subCategories
router.get("/", async (req, res, next) => {
    try {
        const products = await Product.find()
            .populate("seller")
            .populate("category")
            .populate("subcategory");
        res.json(products);
    } catch (error) {
        res.status(400).json({ Error: error });
        next(error);
    }
});

// POST add subCategory returns all the subCategories
router.post("/add", async (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price;
    const category = req.body.category;
    const description = req.body.description;
    const estimatedTime = req.body.estimatedTime;
    const images = req.body.images;
    const quantity = req.body.quantity;
    const seller = req.body.seller;
    const subcategory = req.body.subcategory;
    const newProduct = new Product({
        category,
        description,
        estimatedTime,
        images,
        name,
        price,
        quantity,
        seller,
        subcategory,
    });
    try {
        await newProduct.save();
        let s = await Seller.findOne({ _id: seller });
        s.products = [...s.products, newProduct._id];
        await s.save();
        res.json(newProduct);
    } catch (err) {
        res.status(400).json({ Error: err });
        next(err);
    }
});

// GET user by id
// router.get("/:id", async (req, res, next) => {
//     try {
//         const product = await Product.findById(req.params.id)
//             .populate("seller")
//             .populate("category")
//             .populate("subcategory");
//         res.json(product);
//     } catch (err) {
//         res.status(400).json({ Error: err });
//         next(err);
//     }
// });

// DELETE user by ic returns all the subCategories
router.delete("/delete/:id", async (req, res, next) => {
    let id = req.params.id;
    Product.findOneAndRemove({ _id: id }, async (err, doc) => {
        if (err) {
            res.json({ Error: err });
        } else {
            const products = await Product.find()
                .populate("seller")
                .populate("category")
                .populate("subcategory");
            res.json(products);
        }
    });
});

// UPDATE user
router.post("/update/:id", async (req, res, next) => {
    const id = req.params.id;
    const name = req.body.name;
    const price = req.body.price;
    const category = req.body.category;
    const description = req.body.description;
    const estimatedTime = req.body.estimatedTime;
    const images = req.body.images;
    const quantity = req.body.quantity;
    const seller = req.body.seller;
    const subcategory = req.body.subcategory;
    Product.findOneAndUpdate(
        { _id: id },
        {
            category: category,
            description: description,
            estimatedTime: estimatedTime,
            images: images,
            name: name,
            price: price,
            quantity: quantity,
            seller: seller,
            subcategory: subcategory,
        },
        async (err, result) => {
            // console.log(err, result);
            if (err) {
                res.status(400).json({ Error: err });
            }
            const products = await Product.find()
                .populate("seller")
                .populate("category")
                .populate("subcategory");
            res.json(products);
        }
    );
});

router.get("/mostSold", async (req, res, next) => {
    try {
        const products = await Product.find()
            .limit(6)
            .sort({ updatedAt: "desc" })
            .populate("seller")
            .populate("category")
            .populate("subcategory");
        res.json(products);
    } catch (error) {
        res.status(400).json({ Error: error });
        next(error);
    }
});

router.get("/randomProduct", async (req, res, next) => {
    // try {
    Product.count().exec(function (err, count) {
        // Get a random entry
        var random = Math.floor(Math.random() * count);

        if (err) {
            res.json({ Error: err });
        } else {
            // Again query all users but only fetch one offset by our random #
            Product.findOne()
                .skip(random)
                .exec(function (err, result) {
                    // Tada! random user
                    // console.log(result);
                    if (err) {
                        res.json({ Error: err });
                    }
                    res.json(result);
                });
        }
    });
});

router.get("/subCategory/:id", async (req, res, next) => {
    try {
        let result;
        let product = await Product.find({ subcategory: req.params.id })
            .limit(1)
            .exec();

        // console.log(product);
        if (product.length > 0) {
            product = product[0];
            if (product.images.length > 0) {
                result = { img: product.images[0] };
            } else {
                result = {
                    img:
                        "https://www.amityinternational.com/wp-content/uploads/2019/02/product-placeholder.jpg",
                };
            }
        } else {
            result = {
                img:
                    "https://www.amityinternational.com/wp-content/uploads/2019/02/product-placeholder.jpg",
            };
        }
        res.json(result);
    } catch (error) {
        res.status(400).json({ Error: error });
        next(error);
    }
});

router.post("/search", async (req, res, next) => {
    const search = req.body.search;
    try {
        let products = await Product.find({
            name: { $regex: search, $options: "ix" },
        })
            .populate("seller")
            .populate("category")
            .populate("subcategory");

        res.json(products);
    } catch (error) {
        res.status(400).json({ Error: error });
        next(error);
    }
});

router.get("/subCategoryProducts/:id", async (req, res, next) => {
    try {
        let products = await Product.find({ subcategory: req.params.id })
            .populate("seller")
            .populate("category")
            .populate("subcategory");
        res.json(products);
    } catch (error) {
        res.status(400).json({ Error: error });
        next(error);
    }
});

// .sort({ updatedAt: "desc" })
