import app from "./src/app.js";
import mongoose from "mongoose";

const MONGO_URI=process.env.MONGO_URI;
const PORT=process.env.PORT;

mongoose.connect(MONGO_URI)
.then(()=>{
    console.log("Database connected");
    app.listen(PORT,()=>{
        console.log(`server on ${PORT}`);
    });
})
.catch(()=>{
    console.log("Database connected failed");
});