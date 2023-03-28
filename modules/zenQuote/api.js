
let zenquotes_api_key = process.env.ZENQUOTE_CLIENT_ID;

const quote_url = `https://zenquotes.io/api/quotes/${zenquotes_api_key}&keyword=`;

console.log(quote_url);

async function getQuote(url)
{
  const response = await fetch(url);
  var data = await response.json();
  console.log(data);
}

module.exports = {
  getQuote,
  quote_url
}




