import express, { json } from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "khang";
const yourPassword = "1";
let yourAPIKey = "";
let yourBearerToken = "";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});
const basicAuthCredentials = `${yourUsername}:${yourPassword}`;
const encodedCredentials = Buffer.from(basicAuthCredentials).toString("base64");
const authHeader = `Basic ${encodedCredentials}`;
app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  try{
    const respone = await axios.get("https://secrets-api.appbrewery.com/random");
    const result=  JSON.stringify(respone.data);
    res.render("index.ejs",{content: result});
  }catch(err){
    console.log(err.message);
  }
});
app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
    try {
      const response = await axios.get("https://secrets-api.appbrewery.com/all?page=2", {
        headers: {
          Authorization: authHeader,
        },
      })
      res.render("index.ejs",{content: JSON.stringify(response.data)});
    }
    catch{(err)=>res.render("index.ejs",{content: err.message});};
  
});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  try{
    const resp = await axios.get(API_URL+"/generate-api-key");
    yourAPIKey = resp.data.apiKey;
  }catch(err){
    console.log("cant generate apikey"+err.message);
  }

  try{
    const resp = await axios.get(API_URL+"/filter",{
      params: {
        score: 5,
        apiKey: yourAPIKey
      }
    })
    res.render("index.ejs",{content: JSON.stringify(resp.data)});
  }
  catch(err){
    res.render("index.ejs",{content: err.message});
  }
});

app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
  try {
    const resp = await axios.post(API_URL+"/get-auth-token",{
      username: yourUsername,
      password: yourPassword
    });
    yourBearerToken = resp.data.token;
  } catch (err) {
    console.log("cant get token"+err.message);
  }

 try{
  const resp = await axios.get(API_URL+"/secrets/2",{
    headers: {
      Authorization: `Bearer ${yourBearerToken}`
    }
  });
  res.render("index.ejs",{content: JSON.stringify(resp.data)});
 }catch(err){
  res.render("index.ejs",{content: err.message});
 }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
