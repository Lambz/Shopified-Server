import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
        customer: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        products: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: "Order",
                },
                quantity: Number,
            },
        ],
        status: Number,
    },
    { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
