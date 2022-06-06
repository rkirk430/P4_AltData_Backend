// Import Dependencies
const express = require("express");
const cors = require("cors");

// Import JSON files
const sentiment = require("./sentiment.json");
const government = require("./government.json");

// Create our app object
const app = express();

// set up middleware
app.use(cors());

//home route for testing our app
app.get("/", (req, res) => {
  res.send("Hello World");
});

// route for retrieving gov't trade data
app.get("/government", (req, res) => {
  // send gov't data via JSON
  res.json(government);
});

// route for retrieving sentiment info
app.get("/sentiment", (req, res) => {
  // send projects via JSON
  res.json(sentiment);
});

//declare a variable for our port number
const PORT = process.env.PORT || 4000;

// turn on the server listener
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));


//Heroku Deployment//

//== https://p4-altdata-backend.herokuapp.com/
//== https://p4-altdata-backend.herokuapp.com/government
//== https://p4-altdata-backend.herokuapp.com/sentiment