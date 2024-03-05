const express=require("express");
const Order =require("../models/Orders")
const router=express.Router();
router.post("/orderData",async(req,res)=>{
   let data=await req.body.order_data
   let email=await req.body.email
   await data.splice(0,0,{Order_Date:req.body.order_date})
   let eId=await Order.findOne({email:req.body.email})
   if(eId===null){
    try{
   await Order.create({
        email:email,
        order_data:[data]
    }).then(()=>res.json({success:true}))
}catch(err){
    console.log("Server Error",err.message)
}
   }
   else{
    try{
await Order.findOneAndUpdate({email:req.body.email},{$push:{order_data:data}}).then(()=>res.json({success:true}))
    }catch(err){
res.send("server error",err.message)
    }
   }
})
router.post("/myOrderData",async(req,res)=>{
    try{
    let myData=await Order.findOne({email:req.body.email});
    res.send({orderData:myData});
    }
    catch(err){
        console.log(err);
    }
})
module.exports=router