  
  //import required modules
const express = require("express"); 
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const zenQuote = require("./modules/zenQuote/api");
const { req } = require("http");
const { res } = require("express");
const { inputValue } = require("./public/formProcess");


   //set up Express app/object and port
const app = express();
const port = process.env.PORT || "8888";

//define important folders
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// set up public folder
app.use(express.static(path.join(__dirname, "public")));


   // Page Routes
// console.log(zenQuote);
app.get("/", (req, res) => { res.render("index", { title: "Home" });
  });

app.get("/", async(req, res) => {
let quote = await zenQuote.quote_url.getQuote();
console.log(quote);
res.render("index", {title: "Zen Quote", zen_quote: quote})
});


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");  

   //set up server listening
app.listen(port, () => {
console.log(`Listening on http://localhost:${port}`);
});



// App logic


let userInput = inputValue;

let keyWord = "forgiveness";

var QuoteArray = [];

function keywordQuote(keywordInput) {
   var QuoteArray = zenQuote.getQuote(zenQuote.quote_url + keywordInput);
}


keywordQuote(userInput);

// console.log(QuoteArray)



