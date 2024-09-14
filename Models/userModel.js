import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:function(v){
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message : props=> `${props.value} is not a valid email address`
        }
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true,
        validate:{
            validator:function(v){
                return v == this.password
            },
            message:'Password and confirm password does not matches'
        }
    }

});

userSchema.pre('save', async function(next){

    if(!this.isModified('password')){
        return next();
    }

    const hash = await bcrypt.hash(this.password,12);
    this.password = hash ;
    this.confirmPassword = undefined ;

})

userSchema.methods.comparePassword = async function (enteredPass,dbPass){
    return await bcrypt.compare(enteredPass,dbPass);
}

const userModel = mongoose.model('users',userSchema);

export default userModel ;