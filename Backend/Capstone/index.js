import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { type } from "os";
import { constants } from "buffer";
// import ejs from "ejs";
const API_URL  = "https://v2.jokeapi.dev/joke/";
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("./public"));
app.get("/", async (req,res)=>{
    try {
        const result = await axios.get(API_URL+"Any?format=txt");
        res.render("index.ejs",{content: JSON.stringify(result.data)});
    } catch (error) {
        res.render("index.ejs",{content: error.message});
    }
})
app.post("/submit", async (req, res)=>{
    try {
        if(req.body.type){
            const result = await axios.get(API_URL+req.body.type.toString()+"?format=txt");
            res.render("index.ejs",{content: JSON.stringify(result.data)} );
        }
        else
            throw new Error('ERROR: Submited without choosing categories.')
    } catch (error) {
        res.render("index.ejs",{content: error.message});
    }
})
app.listen(port,()=>console.log("Server is running on port "+port));