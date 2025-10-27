import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 3000;


//connecting to mongdb
connectDB();

app.get("/", (req,res) =>{
    res.send("Welcome to api");
});


//API 
app.use("/api/users", userRoutes);


app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
});