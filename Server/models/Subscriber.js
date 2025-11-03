import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema({
    email: {
        type: required,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,        
    },
    subscribedAt:{
        type: Date,
        default: Date.now,
    },
});

const Subscriber = mongoose.model("Subscriber", subscriberSchema);
