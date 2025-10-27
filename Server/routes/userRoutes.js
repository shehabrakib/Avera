import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import protect from "../middleware/authMiddleware.js"

const router = express.Router();


router.post("/register", async (req, res) =>{
    const {name , email, password} = req.body;

    try{
        let user = await User.findOne({email});
        if(user) return res.status(400).json({message: "User already exists"});

        user = new User({name,email, password});
        await user.save();

        // res.status(201).json({
        //     user: {
        //         _id: user._id,
        //         name: user.name,
        //         email: user.email,
        //         role: user.role
        //     }
        // })

        const payload = { user: {id:user._id , role:user.role}};

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn: "96h"},
            (err,token) =>{
                if(err) throw err;
                res.status(201).json({
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    },
                    token,
                });
            }
        );


    }
    catch(error){
        console.log(error);
        res.status(500).send("Server Error");
    }
} );

router.post("/login", async(req, res) => {
    const {email, password} = req.body;

    try{
        let user = await User.findOne({email});
        if(!user)return res.status(400).json({message:"Invalid Credentials"});

        const isMatch = await user.matchPassword(password);

        if(!isMatch){
            return res.status(400).json({message: "Invalid Credentials"});
        }

        const payload = { user: {id:user._id , role:user.role}};

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn: "96h"},
            (err,token) =>{
                if(err) throw err;
                res.json({
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    },
                    token,
                });
            }
        );

    }
    catch(error){
        console.log(error);
        res.status(500).send("Server Error");

    }
});

router.get("/profile",protect,async(req, res) =>{
    res.json(req.user);
});

export default router;