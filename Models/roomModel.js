import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    maxcount:{
        type:Number,
        required:true
    },
    phonenumber:{
        type:Number,
        required:true,
        minLength:[10,'Phone number must contain 10 Digits.'],
        maxLength:[10,'Phone number must contain 10 Digits']
    },
    rentperday:{
        type:Number,
        required:true
    },
    imageurls:[],
    currentbookings:[],
    type:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    facilities:[]
},{
    timestamps:true
})

const roomModel = mongoose.model('rooms',roomSchema);

export default roomModel ;

