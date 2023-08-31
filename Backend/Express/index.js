import express from "express";
var app = express();
var port = 3000;
app.get("/",(req,res)=>{
    res.send("../jQuery/index.html");
})
app.listen(port,()=>{console.log("Your sever is running");});