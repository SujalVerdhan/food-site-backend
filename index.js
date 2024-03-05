const express=require("express");
const app=express();
const mongo=require("./db")
const createUser =require("./Routes/CreateUser")
const Displaydata=require("./Routes/DisplayData")
const OrderData=require("./Routes/OrderData")
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }));
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000"),
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With, Content-Type, Accept "
    );
    next();

})
app.use(express.json())
mongo();
app.use("/api",createUser)
app.use("/api",Displaydata)
app.use("/api",OrderData)
app.listen(5000,()=>{
console.log("listening to port 5000")
})