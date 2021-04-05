import { default as express } from "express";
import { default as cors } from "cors";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

// Routes require
import { router as userRouter } from "./routes/user.mjs";
import { router as sellerRouter } from "./routes/seller.mjs";
import { router as subCategoryRouter } from "./routes/subCategory.mjs";
import { router as categoryRouter } from "./routes/category.mjs";
import { router as productRouter } from "./routes/product.mjs";
import { router as orderRouter } from "./routes/orders.mjs";

// Initial setup
const app = express();
const port = process.env.PORT || 3000;

// App usage for CORS and JSON parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

// Connection to MongoDB server and DB
// Connection methods
const uri = process.env.DB_URI;
mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connection established with MongoDB server");
    })
    .catch((err) => {
        console.log(
            `Error establishing connection with MongoDB server\n${err}`
        );
    });

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB connected!");
});

// API endpopints
// For GET, POST, DELETE and UPDATE

app.get("", (req, res) => {
    res.json("Welcome");
});

// User Routes
app.use("/user", userRouter);

// Seller Routes
app.use("/seller", sellerRouter);

// Sub Category Route
app.use("/subCategories", subCategoryRouter);

//Category Route
app.use("/categories", categoryRouter);

//Products Route
app.use("/products", productRouter);

//Order Route
app.use("/orders", orderRouter);

// App server initialization
app.listen(port, () => {
    console.log(`Server running at PORT ${port}`);
});
