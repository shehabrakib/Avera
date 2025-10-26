import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

// console.log(process.env.PORT);


const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get("/", (req,res) =>{
    res.send("Welcome to api");
});

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
});