//import required modules
const express = require("express"); 
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const zenQuote = require("./modules/zenQuote/api");
const { req } = require("http");
const { res } = require("express");

   //set up Express app/object and port
const app = express();
const port = process.env.PORT || "8888";

//define important folders
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// set up public folder
app.use(express.static(path.join(__dirname, "public")));


   // Page Routes
// console.log(zenQuote);
app.get("/", (req, res) => { res.render("index", { title: "Home" });
  });

// parse json

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

//get form data
app.post('/submitInput',(req,res) => {
   // preventDefault();
   var userInput = req.body['userInput'];
   
   console.log(userInput);
   var QuoteArray = [];
   function keywordQuote(keywordInput) {
       var quotes = zenQuote.getQuote(zenQuote.quote_url + keywordInput);
       QuoteArray.push(quotes);
      //  var quoteSingle = res.json(QuoteArray[0]);
      var quoteSingle = QuoteArray[0];
       console.log(quoteSingle);
   }
   keywordQuote(userInput);
 });

// app.get("/", async(req, res) => {
// let quote = zenQuote.getQuote(zenQuote.quote_url + keywordInput);
// // console.log(quote);
// res.render("index", {title: "Zen Quote", zen_quote: quote})
// });

app.get("/", async(req, res) => {
let quote = await zenQuote.quote_url.getQuote(zenQuote.quote_url + keywordInput);
// console.log(quote);
res.render("index", {title: "Zen Quote", zen_quote: quote.h})
});


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");  

   //set up server listening
app.listen(port, () => {
console.log(`Listening on http://localhost:${port}`);
});