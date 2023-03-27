
let zenquotes_api_key = process.env.ZENQUOTE_CLIENT_ID;

const quote_url = `https://zenquotes.io/api/quotes/${zenquotes_api_key}&keyword=`;

console.log(quote_url);

async function getQuote(url)
{
  const response = await fetch(url);
  var data = await response.json();
  console.log(data);
}

// async function getQuote()
// {
//   let reqUrl = `${quote_url}`;
//   let response = await fetch(
//     reqUrl,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "h": "quote",
//         "zenQuote-api-key": process.env.ZENQUOTE_CLIENT_ID

//       }
//     }
//     );
//   return await response.json();
//   console.log(data);
// }

module.exports = {
  getQuote,
  quote_url
}
// res = getQuote(quote_url);



