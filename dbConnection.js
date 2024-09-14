import mongoose from "mongoose";

let dbConnection = ()=>{
    mongoose.connect(process.env.CON_STRING)
    .then((res)=>{
        console.log('DBConnection successfull')
    }).catch((err)=>{
        console.log('Unable to connect to DB  =>  '+err);
    })
}

export default dbConnection ;