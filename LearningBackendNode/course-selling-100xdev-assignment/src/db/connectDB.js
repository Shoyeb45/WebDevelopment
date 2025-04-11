import mongoose from "mongoose";

async function connectDB() {
    try {
        
        const res = mongoose.connect(process.env.MONGODB_URI);
        console.log(`[INFO] MongoDB connection successful`);
    
    } catch (error) {
        
        console.error(`[Error] MongoDB connection failed \n Error : ${error}`);
    }
}

export {
    connectDB
};