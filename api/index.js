// /api/index.js
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const fs = require("fs");

// your existing modules (paths still correct from /api to /modules)
const openAiApi = require("../modules/zenQuote/openAiApi");
const openAiZenQuote = require("../modules/zenQuote/AIZen");
const { jsonSelect } = require("../modules/jsonSelect/jsonSelect");
const { keywordSelect } = require("../modules/keywordSelect/keywordSelect");

// express
const app = express();

// IMPORTANT: use project root for views/public (not __dirname, which is /api)
const ROOT = process.cwd();
app.set("views", path.join(ROOT, "views"));
app.set("view engine", "pug");

// static (Vercel serves /public automatically, but keeping this is fine)
app.use(express.static(path.join(ROOT, "public")));

// body parsing
const bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.get("/", (req, res) => {
  res.render("index", { title: "WisDM" });
});

app.post("/", async (req, res) => {
  const userSentence = req.body["userInput"];

  const keywordArray = [
    "anxiety","change","choice","confidence","courage","dreams","excellence","failure",
    "fairness","fear","forgiveness","freedom","future","happiness","inspiration","kindness",
    "leadership","life","living","love","pain","past","success","time","today","truth","work"
  ];

  const KeywordRequest = `analyze ${userSentence} and respond with the most appropriate keyword from ${JSON.stringify(keywordArray)}`;

  const openAIZenResponse = openAiZenQuote.getQuoteAndAiKeyword(KeywordRequest);
  const quotes = await openAIZenResponse;

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const singleQuoteAi = quotes[randomIndex]?.q;
  const singleQuoteAuthorAi = quotes[randomIndex]?.a;

  if (singleQuoteAi) {
    res.render("index", {
      title: "Home",
      zen_quote: singleQuoteAi,
      quote_author: singleQuoteAuthorAi,
      userSentence
    });
  } else {
    res.render("index", { title: "Home" });
  }
});

// DO NOT call app.listen on Vercel.
// Export a handler that passes requests to Express.
module.exports = (req, res) => app(req, res);
// If you prefer ESM: export default (req, res) => app(req, res);
