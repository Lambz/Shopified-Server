import mongoose from "mongoose";

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    label: String,
    value: String,
    subCategories: [{ type: Schema.Types.ObjectId, ref: "SubCategory" }],
});

export const Category = mongoose.model("Category", categorySchema);
