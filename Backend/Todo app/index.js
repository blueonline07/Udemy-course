import express, { urlencoded } from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

app.use(express.static("public"))



app.use(bodyParser.urlencoded({extended: true}));
var obj = {tasks: [], works: []};
app.get("/",(req,res)=>{
    res.render("index.ejs");
})
app.get("/work",(req,res)=>{
    res.render("work.ejs");
})
app.post("/submit",(req,res)=>{
    if(req.body.task){
        obj.tasks.push(req.body.task);
        res.render("index.ejs",obj);
    }
    if(req.body.work){
        obj.works.push(req.body.work);
        res.render("work.ejs",obj);
    }

})
app.listen(port, ()=>{console.log(`Server running on port ${port}`)});