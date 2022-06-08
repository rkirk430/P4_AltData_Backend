// Import Dependencies
const express = require("express");
const cors = require("cors");

// Import JSON files
// const sentiment = require("./sentiment.json");
// const government = require("./government.json");
// const { response } = require("express");

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
  res.json();
});




// route for retrieving sentiment info
//______________________________________________

// app.get("/sentiment", (req, res) => {
  //-- send projects via JSON
  // res.json(sentiment);
// });



// New Route for Retrieving sentiment info
//______________________________________________

// app.get("/sentiment", (req, res) => {
//   fetch('https://apewisdom.io/api/v1.0/filter/all-stocks/page/1')
//     .then (res => res.json())
//     .then(data => console.log(data))
//     // .then(data => res.send(data))
//     return res.json();
// });


//--Registering "Cannot GET /sentiment" in Heroku as error (before error was "internal error")
//________________________________________________________________________



app.get("/sentiment", async(req, res, next) => {
  const data = await fetch('https://apewisdom.io/api/v1.0/filter/all-stocks/page/1');
  const sentdata = await data.json();

    // .then (res => res.json())
    // .then(data => sentdata=data)
    // .then(data => console.log(data))
    // .then(data => res.send(data))
    res.send(sentdata);
});

//-- Option Two -- Cannot GET /sentiment
//________________________________________________________________________

// app.get("/sentiment", (req, res, next) => {
//   var corsOptions = {
//     origin: "https://apewisdom.io/api/v1.0/filter/all-stocks/page/1",
//     optionsSuccessStatus: 200
//   }
//   res.header("Access-Control-Allow-Origin", "https://apewisdom.io/api/v1.0/filter/all-stocks/page/1");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
//   fetch('https://apewisdom.io/api/v1.0/filter/all-stocks/page/1')
//     .then (res => res.json())
//     .then(data => console.log(data))
//     // .then(data => res.send(data))
//     return res.json();
// });



//--Option 3

// var corsOptions = {
//   origin: 'http://example.com',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }


//declare a variable for our port number
const PORT = process.env.PORT || 4000;

// turn on the server listener
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));


//Heroku Deployment//

//== https://p4-altdata-backend.herokuapp.com/
//== https://p4-altdata-backend.herokuapp.com/government
//== https://p4-altdata-backend.herokuapp.com/sentiment