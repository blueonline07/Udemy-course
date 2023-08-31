import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
const app = express();
const port = 3000;
var message = "Enter your name below.";
var yourName =  {numOfLetter: 0};
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.post("/submit", (req, res) => {
  res.render("index.ejs",{
    numOfLetter : req.body.lName.length + req.body.fName.length
  })
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
