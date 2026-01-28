import mongoose from "mongoose";
import env from "./env.js";

const connectDB = async () => {
    try {
        
        mongoose.set('strictQuery', true);
        const conn = await mongoose.connect(env.MONGO_URI);
        console.log('mongoose connected.');        
        
    } catch (error) {
        console.log('connection failed:',error.message);
        process.exit(1);
    }
};

export default connectDB