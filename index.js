// import required modules

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


// page routes

app.get("/", (req, res) => { res.render("index", { title: "Home" });
  });

// parse json

const bodyParser = require('body-parser');

const { keywordSelect } = require("./modules/keywordSelect/keywordSelect");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

// get form data, narrow sentence down to a keyword, append keyword in api call, and render zenquote results.

app.post('/submitInput',async(req,res) => {
   
   let userSentence = req.body['userInput'];

   const keywordArray = ["anxiety","change","choice","confidence","courage","dreams","exellence","failure","fairness","fear","forgiveness","freedom","future","happiness","inspiration","kindness","leadership","life","living","love","pain","past","success","time","today","truth","work"];

   // let testInput = "What is the meaning of life?";

   let KeywordRequest = `analyze ${userSentence} and respond with the most appropriate keyword from ${keywordArray}`

   // test variable

   // let openAiZenResponse = "life";

  // using function with zen api instead of openai (fallback, and better for when working on
  // styling etc)

   let hardCodeKeyword = keywordSelect(userSentence);

   let zenResponse = zenQuote.getQuote(hardCodeKeyword);

   let quotesAlt = await zenResponse;

          // real openAiZenResponse

  let openAIZenResponse = openAiZenQuote.getQuoteAndAiKeyword(KeywordRequest);

  let quotes = await openAIZenResponse;

  // console.log(quotes[0]);

  // keywordSelect function variables

  let singleQuoteAlt;
  let singleQuoteAuthorAlt;
  singleQuoteAlt = quotesAlt[0]['q'];
  singleQuoteAuthorAlt = quotesAlt[0]['a'];

  // AI variables

  let singleQuoteAi;
  let singleQuoteAuthorAi;
  singleQuoteAi = quotes[0]['q'];
  singleQuoteAuthorAi = quotes[0]['a'];


  // console.log(singleQuoteAi);
  // console.log(singleQuoteAlt);
  // console.log(singleQuoteAuthorAlt);

  // openai can be glitchy with certian keywords (ie 'life') so have a failsafe backup using the keywordSelect function.

  if (singleQuoteAi['q'] === "No items found for the given request.") {
    res.render("index", {title: "Zen Quote", zen_quote: singleQuoteAlt, quote_author: singleQuoteAuthorAlt});
  }

  if (singleQuoteAi) {
    res.render("index", {title: "Zen Quote", zen_quote: singleQuoteAi, quote_author: singleQuoteAuthorAi});
  }
  else {
    res.render("index", {title: "Zen Quote"});
  }
 });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


   // set up server listening

app.listen(port, () => {
console.log(`Listening on http://localhost:${port}`);
});