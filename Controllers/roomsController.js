import roomModel from "../Models/roomModel.js";

export const getRooms = async(req,res)=>{
    try{
     let data = await roomModel.find();
     res.status(200).json({
        status:"success",
        data
     })
    }catch(err){
       res.status(400).json({
        status:"fail",
        message:err.message
       })
    }
}

export const updaterooms = async(req,res)=>{
     const {roomid,facilityarray} = req.body
      let data = await roomModel.findByIdAndUpdate(roomid,{facilities:facilityarray})
      res.status(200).send(data)
     try{}catch(err){
      res.status(400).send(err.message)
     }
}