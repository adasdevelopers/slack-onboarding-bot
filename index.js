require('dotenv').config();
const SlackBot = require('slackbots');
const axios = require('axios');
const { get } = require('lodash');
var Vow = require('vow');

const bot = new SlackBot({
    token: process.env.SLACK_AUTH_TOKEN,
    name: "Ada's Bot"
});


// Starting handler
bot.on('start', () => {
    // bot.postMessageToChannel('testing',  "Welcome to Ada's Team Workspace");
});

bot.on('error', err => console.log(err));

//Message Handler
bot.on('message',(data) => {
    console.log(data)
    // Checkign if a member has joined the welcoming channel
    if(data.subtype === 'channel_join')
    {
        // console.log(data)
        // bot.getUser(data.user).then((name) => console.log(name))
        publicGreeting(data.user)
        getChannels()
        console.log(getChannels())
    }
});


function publicGreeting(userID){
    // bot.getUserById(user).then(() => console.log(name))
    bot.getUserById(userID).then( user => {
        var greeting = `Welcome to Ada's Team Workspace ${user.name}`
        bot.postMessageToChannel('testing',  greeting);
    })
}

// *** promise bug *** // Leave for me 
// function getChannels(){
//     var listofChannels = []
//     bot.getChannels().then( allChannels => {
//         allChannels.channels.foreach(channel =>  listofChannels.push(channel.name))
//     })
// }

// // parses the text as url encoded data and exposes the resulting object
// app.use(bodyParser.urlencoded({extended: true}));
// // parses the text as json and exposes the resulting object
// app.use(bodyParser.json());

// // here we take the /command and the response url[which is where slack listens to the command and calls the bot]
// app.post('/', (req, res) => {
//   // console.log(req.body)
//   var data = {form: {
//     token: process.env.SLACK_AUTH_TOKEN,
//     channel: "#test",
//     text: "Hey :wave:, welcome to Ada's Slack Workspace\n I'm AdaBot."
//   }};
//   request.post('https://slack.com/api/chat.postMessage', data, function (error, response, body) {
//     // Sends welcome message
//     console.log("It did something")
//     console.log(res)
//     res.json();
//   });
// });