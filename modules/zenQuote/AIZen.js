const fs = require('fs');
const path = require('path');

const { keywordSelect } = require("../keywordSelect/keywordSelect");
const { jsonSelect } = require("../jsonSelect/jsonSelect");


const zenquotes_api_key = process.env.ZENQUOTE_CLIENT_ID;
const quote_url = `https://zenquotes.io/api/quotes/${zenquotes_api_key}&keyword=`;

const { Configuration, OpenAIApi } = require("openai");

const openai_api_key = process.env.OPENAI_API_KEY;

const keywordArray = ["anxiety","change","choice","confidence","courage","dreams","excellence","failure","fairness","fear","forgiveness","freedom","future","happiness","inspiration","kindness","leadership","life","living","love","pain","past","success","time","today","truth","work"];

const configuration = new Configuration({
  organization: "org-r47BJD5uMTpizL52JRk8is7d",
  openai_api_key: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const endpoint = 'https://api.openai.com/v1/chat/completions';

async function getQuoteAndAiKeyword(keywordRequest) {
  // openai api call
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${openai_api_key}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: keywordRequest
        },
        {
          role: "user",
          content: `${keywordArray}`
        },
      ],
      temperature: 0.2
    })
  });

  const openaiData = await response.json();
  const keyword = openaiData.choices[0].message.content;

  let cleanedKeyword = keywordSelect(keyword);

  // const response2 = await fetch(quote_url + cleanedKeyword);
  // var data = await response2.json();

  const localResponse = await jsonSelect(cleanedKeyword);
  var data = JSON.parse(localResponse);

  // console.log("this is the zenquotes", data);

  return data;
}

module.exports = {
  getQuoteAndAiKeyword
}
