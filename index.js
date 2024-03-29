// import required modules

const express = require("express"); 
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();


const fs = require('fs');

const openAiApi = require('./modules/zenQuote/openAiApi');

                                      // remove zenquote api dependency

// const zenQuote = require("./modules/zenQuote/api");

const openAiZenQuote = require("./modules/zenQuote/AIZen");

const { jsonSelect } = require("./modules/jsonSelect/jsonSelect");

const { req } = require("http");
const { res } = require("express");

//set up Express app/object and port

const app = express();
const port = process.env.PORT || "9001";

//define important folders

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// set up public folder

app.use(express.static(path.join(__dirname, "public")));

// page routes

app.get("/", (req, res) => { res.render("index", { title: "WisDM" });
  });

// parse json

const bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// favicon 

app.use('/favicon.ico', express.static('public/images/favicon.ico'));

// custum function to parse keywords

const { keywordSelect } = require("./modules/keywordSelect/keywordSelect");



// get form data, narrow sentence down to a keyword, append keyword in api call, and render zenquote results.

app.post('/',async(req,res) => {
   
   let userSentence = req.body['userInput'];

   const keywordArray = ["anxiety","change","choice","confidence","courage","dreams","excellence","failure","fairness","fear","forgiveness","freedom","future","happiness","inspiration","kindness","leadership","life","living","love","pain","past","success","time","today","truth","work"];

   // let testInput = "What is the meaning of life?";

   let KeywordRequest = `analyze ${userSentence} and respond with the most appropriate keyword from ${keywordArray}`

   // test variable

   // let openAiZenResponse = "life";

                                              // remove zenquote api dependency

  // using function with zen api instead of openai (fallback, and better for when working on
  // styling etc)

  //  let hardCodeKeyword = keywordSelect(userSentence);

  //  let zenResponse = zenQuote.getQuote(hardCodeKeyword);



  //  let quotesAlt = await zenResponse;

          // real openAiZenResponse

  let openAIZenResponse = openAiZenQuote.getQuoteAndAiKeyword(KeywordRequest);

  let quotes = await openAIZenResponse;

  // Generate a random index

  const randomIndex = Math.floor(Math.random() * quotes.length);

                                          // remove zenquote api dependency

  // keywordSelect function variables

  // let singleQuoteAlt;
  // let singleQuoteAuthorAlt;
  // singleQuoteAlt = quotesAlt[0]['q'];
  // singleQuoteAuthorAlt = quotesAlt[0]['a'];
 
  // AI variables

  let singleQuoteAi;
  let singleQuoteAuthorAi;
  singleQuoteAi = quotes[randomIndex]['q'];
  singleQuoteAuthorAi = quotes[randomIndex]['a'];


  // openai can be glitchy with certian keywords (ie 'life') so have a failsafe backup using the keywordSelect function.
  // the keyword select function also filters the open ai responses in order to remove extra text returned by openai

// remove zenquote api dependency

  // if (singleQuoteAi['q'] === "No items found for the given request.") {
  //   res.render("index", { title: "Home", zen_quote: singleQuoteAlt, quote_author: singleQuoteAuthorAlt, userSentence: userSentence });
  // }

  if (singleQuoteAi) {
    res.render("index", { title: "Home", zen_quote: singleQuoteAi, quote_author: singleQuoteAuthorAi, userSentence: userSentence });
  }
  else {
    res.render("index", { title: "Home"});
  }
 });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

   // set up server listening

app.listen(port, () => {
console.log(`Listening on http://localhost:${port}`);
});