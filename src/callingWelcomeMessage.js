require("dotenv").config();

const callWelcomeMessage = async ( event, client, context, app ) => {
    try{
        console.log(event)
        if (workspace === 'adasteam') {
          await app.client.chat.postMessage({
              token: process.env.SLACK_BOT_TOKEN,
              channel: event.channel,
              user: event.user,
              text: `Hi <@${event.user}>, welcome to Ada’s Team!
              The Ada's Team workspace is for the executives to collaborate, ask questions, and fulfill Ada's Team initiatives. Although everyone has their VP roles to complete, the Ada's Team executive committee is meant to be a safe space; if you are struggling with your work, please ask others for help!

              Congrats, and thanks for joining our team. We're so happy to have you here with us!
              `
            })
          } else if (workspace === 'adasmentors') {
            await app.client.chat.postMessage({
                token: process.env.SLACK_BOT_TOKEN,
                channel: event.channel,
                user: event.user,
                text: `Welcome to the Ada’s Mentors workspace!

                The goal of Ada’s Mentors is to mentor underprivileged students lacking the confidence and exposure to university and the application process.
                `
              })
          } else if (workspace === 'adasnetwork') {
            await app.client.chat.postMessage({
                token: process.env.SLACK_BOT_TOKEN,
                channel: event.channel,
                user: event.user,
                text: `Hi <@${event.user}>, welcome to Ada’s Network!

                This workspace was created to keep those involved with Ada’s Team, past or present, connected. It’s a supportive network that strives to provide a space for knowledge and opportunities to be shared with one another that empower our academic or career choices. We’re so happy to have you here with us!
                `
              })
          } else if (workspace === 'adasdevs') {
            await app.client.chat.postMessage({
                token: process.env.SLACK_BOT_TOKEN,
                channel: event.channel,
                user: event.user,
                text: `Hi <@${event.user}>, welcome to Ada’s Developers!

                This workspace was created for the Ada’s Developers initiative, where students come together to create software! This workspace is accessible to software developers, designers, project managers, mentors, and administrators. If you have any questions, refer to this resource or ask one of the administrators for help!
                `
              })
          }
        } catch (error) {
            console.error(error);
        }
    };
module.exports = callWelcomeMessage
