const express=require("express")
const app=express()
const router=express.Router();
router.post("/foodData",(req,res)=>{
    try{
        console.log(global.food_items,global.foodCategory)
        res.status(200).send([global.food_items,global.foodCategory])
    }catch(err){

    }
})
module.exports=router