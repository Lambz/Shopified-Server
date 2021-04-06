import mongoose from "mongoose";

const Schema = mongoose.Schema;

const sellerSchema = new Schema({
    _id: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    company: {
        type: String,
        required: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
    },
    products: [
        {
            type: Schema.Types.Object,
            ref: "Product",
            required: true,
            minlength: 0,
        },
    ],
});

export const Seller = mongoose.model("Seller", sellerSchema);
