import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
        name: String,
        phoneNo: String,
        address: String,
        products: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: Number,
            },
        ],
        status: Number,
    },
    { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
