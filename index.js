
  //import required modules
const express = require("express"); const path = require("path");
   //set up Express object and port
const app = express();
const port = process.env.PORT || "8888";

//define important folders
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

   //Routes
app.get("/", (req, res) => { res.render("index", { title: "Home" });
  });


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");  
   //set up server listening
app.listen(port, () => {
console.log(`Listening on http://localhost:${port}`);
});
