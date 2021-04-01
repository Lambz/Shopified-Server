import mongoose from "mongoose";

const Schema = mongoose.Schema;

const subCategorySchema = new Schema({
    label: String,
    value: String,
});

export const SubCategory = mongoose.model("SubCategory", subCategorySchema);
