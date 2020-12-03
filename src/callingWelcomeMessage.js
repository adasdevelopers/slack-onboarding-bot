require("dotenv").config();
const {database, workspaceChecker} = require('../config/constants')
const callWelcomeMessage = async ( event, client, context, app ) => {
  workspaceCode = event.team  // store team field of event
  //userCode = event.user
    try{
        await app.client.chat.postMessage({
            token: process.env.SLACK_BOT_TOKEN,
            channel: event.channel,
            user: event.user,
            text: `Hi <@${event.user}>, welcome to Ada’s Team!
            The Ada's Team workspace is for the executives to collaborate, ask questions, and fulfill Ada's Team initiatives. Although everyone has their VP roles to complete, the Ada's Team executive committee is meant to be a safe space; if you are struggling with your work, please ask others for help! Congrats, and thanks for joining our team. We're so happy to have you here with us!`}
        )} catch (error) {
            console.error(error);
        }
    };
module.exports = callWelcomeMessage;
