
const zenquotes_api_key = process.env.ZENQUOTE_CLIENT_ID;
const quote_url = `https://zenquotes.io/api/quotes/${zenquotes_api_key}&keyword=`;

// zenquote api

async function getQuote(keyword) {
  const response = await fetch(quote_url + keyword);
  var data = await response.json();
  // console.log(data);
  return data;
}

module.exports = {
  getQuote
}

