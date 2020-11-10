require('dotenv').config();
const SlackBot = require('slackbots');
const _ = require('lodash');
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const request = require("request");

// Creates express (middleware)
const app = express();

// The port used for express server
const PORT = 3000;

// listen/runs server
app.listen(process.env.PORT || PORT, function() {
    console.log('Bot is listening on port ' + PORT);
});

const bot = new SlackBot({
    token: process.env.SLACK_AUTH_TOKEN,
    name: "Ada's Bot"
});

var listofChannels = []
// Placeholder Data
var rolesDescription = "*The various roles are:* \n" + "*Mentors* : [placeholder]\n" + "*Admins*: [placeholder]\n"
var workspaceRules = "Update your rules:"
var sendTrainingMaterial = "[placeholder_training]"
var supplementalResources = "[placeholder_supplementalResources]"
var faq = "[placeholder_faq]"


// Starting handler
bot.on('start', () => {
    updateChannels()
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
    }
    if(data.subtype === 'channel_created'){
        updateChannels()
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
async function updateChannels(){
    listofChannels = []
    bot.getChannels().then( allChannels => {
        allChannels.channels.forEach(channel => { 
            listofChannels.push(channel.name)     
        });
    })
    return listofChannels; // returns a promise of list of channels, once it gets fulfilled.
}


// Create command that shows Instructions on how to update personal information on Slack
app.post("/update info", function(req, res) { 
    res.send("This is a post request to '/update'!!\n" + listofChannels); 
}); 

// Create command to view supplemental resources 
app.post("/resources", function(req, res) { 
    res.send(supplementalResources); 
});

// Create command to view FAQ sheet for workspaces  
app.post("/faq", function(req, res) { 
    res.send(faq); 
}); 

// Create command to view workspace rules 
app.post("/rules", function(req, res) { 
    res.send(workspaceRules); 
}); 
  
// Create command to view training materials 
app.post("/training", function(req, res) { 
    res.send(sendTrainingMaterial); 
});

// Create command to display information about specific roles 
app.post("/roles", function(req, res) { 
    res.send(rolesDescription); 
    
}); 

// Create command to view admins // Data is the bot obtains whenever it is started  
app.post("/admins", function(req, res) { 
    bot.getUsers().then( users => {
        var admins = _.filter(users.members,['is_admin',true]).map(userAdmin => userAdmin.real_name)
        res.send("The following admins of this workspace are: \n"+ (admins)); 
    })
});

// Create command to update workspace rules 
app.post("/update_rules", function(req, res) { 
    console.log(req,res)
    res.send(workspaceRules); 
}); 

