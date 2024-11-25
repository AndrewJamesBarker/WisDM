const fs = require('fs');
const path = require('path');

const { keywordSelect } = require("../keywordSelect/keywordSelect");
const { jsonSelect } = require("../jsonSelect/jsonSelect");

const zenquotes_api_key = process.env.ZENQUOTE_CLIENT_ID;
const quote_url = `https://zenquotes.io/api/quotes/${zenquotes_api_key}&keyword=`;

const OpenAI = require("openai");

// Dont bother using, breaks code
const openai_api_key = process.env.OPENAI_API_KEY;

const keywordArray = [
  "anxiety", "change", "choice", "confidence", "courage", "dreams", "excellence",
  "failure", "fairness", "fear", "forgiveness", "freedom", "future", "happiness",
  "inspiration", "kindness", "leadership", "life", "living", "love", "pain", "past",
  "success", "time", "today", "truth", "work"
];

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getQuoteAndAiKeyword(keywordRequest) {
  try {
    // OpenAI API call
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: keywordRequest },
        { role: "user", content: `${keywordArray}` },
      ],
      temperature: 0.2,
    });

    const openaiData = response; // Directly use response instead of `.json()` in openai@4.x
    const keyword = openaiData.choices[0].message.content;

    let cleanedKeyword = keywordSelect(keyword);

    // Optional: Fetch quote data
    // const response2 = await fetch(quote_url + cleanedKeyword);
    // var data = await response2.json();

    const localResponse = await jsonSelect(cleanedKeyword);
    var data = JSON.parse(localResponse);

    return data;
  } catch (error) {
    console.error("Error in getQuoteAndAiKeyword:", error.message);
    throw error; // Optionally re-throw the error if it needs to be handled further up
  }
}

module.exports = {
  getQuoteAndAiKeyword,
};
