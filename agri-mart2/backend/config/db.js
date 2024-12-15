import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://Adminzero:Badguy01@cluster1.bi6lh.mongodb.net/agri-mart').then(()=>console.log("DB Connected"));
}