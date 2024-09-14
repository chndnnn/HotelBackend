import dotenv from "dotenv";
dotenv.config({path:'./config.env'})
import dbConnection from "./dbConnection.js";
import app from "./app.js";

app.listen(process.env.PORT,()=>{
    console.log('server started');
    dbConnection();
})