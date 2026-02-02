import app from "./src/app.js";
import {connectToDB} from "./src/configs/database.js";

const PORT=process.env.PORT||3000;
connectToDB();

app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`);
});