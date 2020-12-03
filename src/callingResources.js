require("dotenv").config();
const {database, workspaceChecker} = require('../config/constants')
const callResources = async (app, ack, body, workspaceChecker, database) => {
    //console.log(body);
    //console.log(database)
    //console.log(workspaceChecker);
    //console.log(body.team_domain);
    workspaceID = ''
    //FIND THE PROPER WORKSPACE CHANNEL
    for (const [key, value] of Object.entries(workspaceChecker)) {
        if(key == body.team_domain){
            workspaceID = value
        }
      }
    //console.log(typeof(workspaceID))
    const workspaceObject = database[workspaceID];
    //console.log(workspaceID)
    //console.log(workspaceObject);
    blockList = [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "If this is your first time using Slack and you're confused by its interface, learn more about it here -->"
            },
            "accessory": {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": "Click Me!",
                    "emoji": true
                },
                "value": "click_me_123",
                "url": "https://slack.com/resources/slack-101",
                "action_id": "resource-button-action"
            }
        },
        {
            "type": "header",
            "text": {
                "type": "plain_text",
                "text": "Ada's Team Resources:",
                "emoji": true
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": " <https://www.adasteam.ca/|Adas Team Website>"
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "<https://www.instagram.com/adas_team/|Adas Team Instagram : @adas_team>"
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "<https://www.linkedin.com/company/adas-team/|Adas Team LinkedIn>"
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "<https://www.facebook.com/AdasTeamFB/|Adas Team Facebook>"
            }
        }
    ]
    var resourcesList = []
    //console.log(workspaceObject.resources)
    for (const [key, value] of Object.entries(workspaceObject.resources)) {
        resourcesList.push(key,value)
        //console.log(`${key} : ${value}`)
      }
    for(i = 1; i <= resourcesList.length - 1 ; i+=2){
        blockSection = {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `<${resourcesList[i].url}|${resourcesList[i].text}>`
            }
        }
        blockList.push(blockSection)
        //console.log(resourcesList[i])
    }
    //console.log(resourcesList)
	await ack();
	await app.client.chat.postEphemeral({
			token: process.env.SLACK_BOT_TOKEN,
			channel: body.channel_id,
			user: body.user_id,
            //text: "If this is your first time using Slack and you're confused by its interface, learn more about it here: https://slack.com/resources/slack-101 ",
            "blocks": blockList
	})
};

module.exports = callResources;