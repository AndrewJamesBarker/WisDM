// const { response } = require("express");
const { Configuration, OpenAIApi } = require("openai");

const openai_api_key = process.env.OPENAI_API_KEY;

const keywordArray = ["anxiety","change","choice","confidence","courage","dreams","exellence","failure","fairness","fear","forgiveness","freedom","future","happiness","inpiration","kindness","leadership","life","living","love","pain","past","success","time","today","truth","work"];

const configuration = new Configuration({
    organization: "org-r47BJD5uMTpizL52JRk8is7d",
    openai_api_key: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

// open ai api

const endpoint = 'https://api.openai.com/v1/chat/completions';

async function aiKeyword(keywordRequest) {
  
fetch(endpoint, {
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
    temperature: 0.7
  })
})
.then(response => response.json())
.then(data => {
  console.log(data.choices[0].message.content);
  return data.choices[0].message.content;
})
.catch(err => {
  console.error(err);
})
};

module.exports = {
  aiKeyword
}