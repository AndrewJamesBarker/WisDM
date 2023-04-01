
const zenquotes_api_key = process.env.ZENQUOTE_CLIENT_ID;
const openai_api_key = process.env.OPENAI_API_KEY;
const quote_url = `https://zenquotes.io/api/quotes/${zenquotes_api_key}&keyword=`;

async function getQuote(keyword)
{
  const response = await fetch(quote_url + keyword);
  var data = await response.json();
  // console.log(data);
  return data;
}

module.exports = {
  getQuote
}




