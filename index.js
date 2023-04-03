// //import required modules
const express = require("express"); 
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const openAiApi = require('./modules/zenQuote/openAiApi');

const zenQuote = require("./modules/zenQuote/api");

const openAiZenQuote = require("./modules/zenQuote/AIZen");

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


app.post('/submitInput',async(req,res) => {
   
   let userSentence = req.body['userInput'];

   // use js hard coded function to select keyword

   // userInput = keywordSelect(userSentence);

   // or, use openai to interpret sentence for keyword

   const keywordArray = ["anxiety","change","choice","confidence","courage","dreams","exellence","failure","fairness","fear","forgiveness","freedom","future","happiness","inpiration","kindness","leadership","life","living","love","pain","past","success","time","today","truth","work"];

   // let testInput = "What is the meaning of life?";

   let KeywordRequest = `analyze ${userSentence} and respond with the most appropriate keyword from ${keywordArray}`

   // test variable

   // let openAiZenResponse = "life";

   // real openAiResponse

   // let openAiResponse = await openAiApi.aiKeyword(openaiKeywordRequest);

   let openAIZenResponse = openAiZenQuote.getQuoteAndAiKeyword(KeywordRequest);

   console.log('--------------------------------------')

   // console.log(openAIZenResponse);
   // console.log(KeywordRequest);

   let quotes = await openAIZenResponse;

   // console.log(quotes);

   let singleQuote;
   let quoteAuthor;
   let quoteImg;

   singleQuote = quotes[0]['q'];
   quoteAuthor = quotes[0]['a'];
   quoteImg = quotes[0]['i'];

   if (singleQuote) {
      res.render("index", {title: "Zen Quote", zen_quote: quotes[0]})
    } else {
      res.render("index", {title: "Zen Quote"})
    }

 });

// render to page

// app.get("/", async(req, res) => {
   
//    await singleQuote;
   
//    if (singleQuote) {
//      res.render("/", {title: "Zen Quote", zen_quote: quotes[0]})
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