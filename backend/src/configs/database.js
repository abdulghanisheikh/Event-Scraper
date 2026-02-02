import mongoose from "mongoose";
const MONGO_URI=process.env.MONGO_URI;

export function connectToDB(){
    mongoose.connect(MONGO_URI)
    .then(()=>{
        console.log("Database connected");
    })
    .catch(()=>{
        console.log("Database connected failed");
    });
}