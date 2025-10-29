import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Products.js";
import User from "./models/User.js";
import Cart from "./models/Cart.js";
import products from "./data/products.js";

dotenv.config();

mongoose.connect(process.env.Mongo_URI);

const seedData = async () =>{
    try {
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();

        const createdUser = await User.create({
            name: "Admin User",
            email: "admin@example.com",
            password: "123456",
            role:"admin",
        });

        const userID = createdUser._id;

        const sampleProducts = products.map((product) =>{
            return {...product, user: userID};
        });

        await Product.insertMany(sampleProducts);
        console.log("Product data seeded succesfully");
        process.exit(1);
    } catch (error) {
        console.error("Error in seeding the data:", error);
        process.exit(1);
        
    }
}
seedData();