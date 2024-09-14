import userModel from "../Models/userModel.js";
import jwt from 'jsonwebtoken'

function createToken(id){
    return jwt.sign({id:id},process.env.SECERET_STRING,{expiresIn:process.env.JWT_EXPIRE})
}

export const regesterUser = async (req,res)=>{
    try{
      let data = await userModel.create(req.body)
      res.status(200).json({
        status:'success',
        data
      })
    }catch(err){
        res.status(400).json({
            status:'fail',
            message:err.message
        })
    }

}

export const userLogin = async (req,res)=>{
    try{
      let email = await userModel.findOne({email:req.body.email});
     let match = await email.comparePassword(req.body.password,email.password)
     if(email && match){
        const token = createToken(email._id);
        res.status(200).json({
           status:'success',
           token,
           email
         })
     }
     else{
        throw new Error('Invaild Credentials');
     }
    }catch(err){
        res.status(400).json({
            status:'fail',
            message:err.message
        })

    }
}

export const authenticateUSer = async (req,res)=>{
    try{
    let token = req.params.id
    let decodeToken = jwt.verify(token,process.env.SECERET_STRING);
    if(decodeToken){
        var userData = await userModel.findById(decodeToken.id)
    }
    res.status(200).json({
        status:'success',
        userData
    })
    }catch(err){
        res.status(400).json({
            status:'fail'
        })
    }

}