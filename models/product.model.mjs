import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    description: String,
    estimatedTime: Number,
    images: [{ type: String }],
    name: String,
    price: Number,
    quantity: Number,
    seller: { type: Schema.Types.ObjectId, ref: "Seller" },
    subcategory: { type: Schema.Types.ObjectId, ref: "SubCategory" },
});

export const Product = mongoose.model("Product", productSchema);
