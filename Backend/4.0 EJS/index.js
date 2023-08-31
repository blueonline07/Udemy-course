import { dir } from "console";
import express from "express";
import {dirname} from "path";
import { fileURLToPath } from "url";
// import bodyParser from "body-parser";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
const d = new Date();
var weekdayMessage;

// app.use(bodyParser.urlencoded({extended: true}));
if(d.getDay() !=6 && d.getDay != 0){
    weekdayMessage = "let's do somework!";
}
else{
    weekdayMessage = "let's have some fun!";
}
app.get("/",(req,res)=>{
    res.render(__dirname+"/views/index.ejs",{
        message : weekdayMessage
    });
})
app.listen(port,()=>{console.log("listening on port 3000")});