// Import Dependencies
const express = require("express");
const cors = require("cors");

// Import node-fetch to get API data to render in Heroku
const fetch = require('node-fetch');

// Import JSON files
// const sentiment = require("./sentiment.json");
const government = require("./government.json");
// const { response } = require("express");

// Create our app object
const app = express();

// set up middleware
app.use(cors());


// These were added by Keisha, have to find out what these do!
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


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
//______________________________________________

// app.get("/sentiment", (req, res) => {
  //-- send projects via JSON
  // res.json(sentiment);
// });



//--Registering "Cannot GET /sentiment" in Heroku as error (before error was "internal error")
//________________________________________________________________________
// USE THIS OPTION******* Renders on localhost but not on 


app.get("/sentiment", async(req, res, next) => {
  const data = await fetch('https://apewisdom.io/api/v1.0/filter/all-stocks/page/1');
  const sentdata = await data.json();
    res.send(sentdata);
});


//declare a variable for our port number
const PORT = process.env.PORT || 4000;

// turn on the server listener
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));


//** This was added by Keisha, need to find out what it does**** */
module.exports = app;


//Heroku Deployment//

//== https://p4-altdata-backend.herokuapp.com/
//== https://p4-altdata-backend.herokuapp.com/government
//== https://p4-altdata-backend.herokuapp.com/sentiment