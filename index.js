// //import required modules
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
const { keywordSelect } = require("./modules/keywordSelect/keywordSelect");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

//get form data, narrow sentence down to a keyword, append to zenquote api call and render results.

let singleQuote;
let quoteAuthor;
let quoteImg;

app.post('/submitInput',async(req,res) => {
   
   userSentence = req.body['userInput'];

   userInput = keywordSelect(userSentence);
   var quotes = await zenQuote.getQuote(userInput); 

   // quotesJSON = res.json(quotes);
  
   // var singleQuote = res.json(quotes[0]['h']);

   singleQuote = quotes[0]['q'];
   quoteAuthor = quotes[0]['a'];
   quoteImg = quotes[0]['i'];

   // if (singleQuote) {
   //   res.redirect("/", {title: "Zen Quote", zen_quote: singleQuote})
   // } else {
   //   res.redirect("/", {title: "Zen Quote"})
   // }
   console.log(singleQuote);
   console.log(quoteAuthor);
   console.log(quoteImg);

   if (singleQuote) {
      res.render("index", {title: "Zen Quote", zen_quote: quotes[0]})
    } else {
      res.render("index", {title: "Zen Quote"})
    }

 });

// render to page

// app.get("/", (req, res) => {
//    if (singleQuote) {
//            res.render("/", {title: "Zen Quote", zen_quote: singleQuote})
//          } else {
//            res.render("/", {title: "Zen Quote"})
//          }
//    });


// app.get("/", async(req, res) => {
//    let quote = zenQuote.getQuote(zenQuote.quote_url + keywordInput);
//    console.log(quote);
//    res.render("index", {title: "Zen Quote", 
//    zen_quote: quote})
// });


// app.get("/", async(req, res) => {
   
//    await singleQuote;
   
//    if (singleQuote) {
//      res.render("/", {title: "Zen Quote", zen_quote: singleQuote})
//    } else {
//      res.render("/", {title: "Zen Quote"})
//    }
//    });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");  

   //set up server listening
app.listen(port, () => {
console.log(`Listening on http://localhost:${port}`);
});