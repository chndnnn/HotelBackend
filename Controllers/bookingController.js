import bookingModel from "../Models/bookingModel.js";
import roomModel from "../Models/roomModel.js";
import Stripe from 'stripe'
import { v4 as uuidv4 } from 'uuid';

const stripe = new Stripe('sk_test_51PHenrSFZm3kcCFP1TBrfUKU7jliGWrxC22SKZ85y7iil2rKiyQ86OBIMjancReO9n7Iq1omg3jQrRCYCJ4zXhNW00Y0R1Kp0L')

export const createBooking = async(req,res)=>{
    try{
      const uniqueID = uuidv4()

      const customer = await stripe.customers.create({
         email:req.body.token.email,
         source : req.body.token.id,
      })

      const charge = await stripe.paymentIntents.create({
         amount:req.body.totalAmount*100,
         currency:'inr',
         customer:customer.id,
         receipt_email:req.body.token.email,
         automatic_payment_methods: {enabled: true}
      },{
         idempotencyKey:uniqueID
      })
      if(charge){
      req.body.transactionId= uniqueID
     let data = await bookingModel.create(req.body);
     if(data){
      let room = await roomModel.findById(data.roomId)
      room.currentbookings.push({userId : data.userid , toDate:data.toDate , fromDate : data.fromDate , roomId:data.roomId})
      await room.save() 
     }
     res.status(200).json({
        status:'success',
        data
     })
   }
    }catch(err){
     res.status(400).json({
        status:'failed',
        message:err.message
     })
    }
}

export const getBookingByUserEmail = async(req,res)=>{

   try{

      const booking = await bookingModel.find({userid:req.body.userid}).sort({"createdAt":-1})
      res.status(200).json({
         status:"success",
         booking
      })

   }catch(error){
      res.status(200).json({
         status:"fail",
         error
      })
   }

}

export const deleteBookings = async(req,res)=>{
   try{
      let data = await bookingModel.findByIdAndUpdate(req.body.bookingID,{status:'cancelled'});
      if(data){
         let userData = await roomModel.findById(req.body.roomId);
         let currBooking = userData.currentbookings
         let deleteData = currBooking.findIndex(obj => obj.userId == req.body.userId && obj.fromDate==req.body.fromDate && obj.toDate == req.body.toDate)
         userData.currentbookings.splice(deleteData,1)
         userData.save();
      }
      res.status(200).json({
         status:'success',
         data
      })
   }catch(error){
      res.status(400).json({
         status:'failed',
         error : error.message
      })

   }
}