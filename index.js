require('dotenv').config();

// accessing the following modules
// express = Node web framework that writes handlers for requests with different http routes
// used to setting connections which render the reposne
const express = require('express');
// used to parse through json data
const bodyParser = require('body-parser');
// Used to make hhtp calls
const request = require("request");

// Creates express (middleware)
const app = express();
// The port used for express server
const PORT = 3000;

// listen/runs server
app.listen(process.env.PORT || PORT, function() {
  console.log('Bot is listening on port ' + PORT);
});

// parses the text as url encoded data and exposes the resulting object
app.use(bodyParser.urlencoded({extended: true}));
// parses the text as json and exposes the resulting object
app.use(bodyParser.json());

// here we take the /command and the response url[which is where slack listens to the command and calls the bot]
app.post('/', (req, res) => {
  // console.log(req.body)
  var data = {form: {
    token: process.env.SLACK_AUTH_TOKEN,
    channel: "#general",
    text: "Hi, can i get a yeet! :wave: \n I'm your new bot."
  }};
  request.post('https://slack.com/api/chat.postMessage', data, function (error, response, body) {
    // Sends welcome message
    // console.log("It did something")
    // console.log(body)
    res.json();
  });
});
