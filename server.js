// Import Dependencies
const express = require("express");
const cors = require("cors");
require("dotenv").config();

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
// app.get("/government", (req, res) => {
//   // send gov't data via JSON
//   res.json(government);
// });

//----- New Route Using API ---/
//----- This IS Rendering on localhost but not on Heroku --/

// var request = require('request');
// const res = require("express/lib/response");
// let data = null
// url= "https://api.quiverquant.com/beta/historical/senatetrading/aapl";

// app.get("/government", async(req,res) => {
//   request({
//     url: url,
//     method: 'GET',
//     headers:  {
//       Accept: 'application/json',
//       "X-CSRFToken": 'TyTJwjuEC7VV7mOqZ622haRaaUr0x0Ng4nrwSRFKQs7vdoBcJlK9qjAS69ghzhFu',
//       Authorization: `Token ${process.env.QUIVER_API_KEY}`, 
//     }
//     },
//     function (error, response, body) {
//       if (error) throw error;
//       data = body;
//     },
//     )
// res.send(data);
// })

//--- Government Data Option 2 -----------//

app.get('/government', async(req,res) => {
  const URL = 'https://api.quiverquant.com/beta/historical/senatetrading/aapl'
  const options = {
    headers: {
      Accept: 'application/json',
      "X-CSRFToken": 'TyTJwjuEC7VV7mOqZ622haRaaUr0x0Ng4nrwSRFKQs7vdoBcJlK9qjAS69ghzhFu',
      Authorization: `Token ${process.env.QUIVER_API_KEY}`
    }
  }
  fetch(URL, options)
  .then(res => res.json())
  .then(data => res.send(data))
  .catch(err => res.send(err))
})


//----- New Route Using API (Option 2)---/

// app.get("/government", async() => {
//   request({
//     url: "https://api.quiverquant.com/beta/historical/senatetrading/aapl",
//     method: 'GET',
//     headers:  {
//       Accept: 'application/json',
//       'X-CSRFToken' : 'TyTJwjuEC7VV7mOqZ622haRaaUr0x0Ng4nrwSRFKQs7vdoBcJlK9qjAS69ghzhFu',
//       Authorization: '00458d35722ddebc9326c935877a19565788128e', 
//     }}

//   }
    
// )




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