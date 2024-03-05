const mongoose=require("mongoose")
const ordersSchema= new mongoose.Schema({
email:{
    type:String ,
    required:true,
    unique:true,

},
order_data:{
    type:Array,
    required:true
}
})

module.exports=mongoose.model("order",ordersSchema);