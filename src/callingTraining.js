require("dotenv").config();
const {database, workspaceChecker} = require('../config/constants')
const callTraining = async (app, ack, body, database, workspaceChecker) => {
    await ack();

    //console.log(workspaceChecker,database)
    for (const [key, value] of Object.entries(workspaceChecker)) {
        if (key == body.team_domain) {
          workspaceID = value
          console.log(value)
        }
      }
    
    const workspaceObject = database[workspaceID];
    optionList= [
        {
            "text": {
                "type": "mrkdwn",
                "text": "*Update Your Profile!*"
            },
            "description": {
                "type": "mrkdwn",
                "text": "Edit your profile to include a photo of yourself, your name, pronouns, and field."
            },
            "value": "value-0"
        }
    ]
    //console.log(workspaceObject)
    var trainingList = []
    for (const [key, value] of Object.entries(workspaceObject.training)) {
        trainingList.push(value)
      }
    //console.log(trainingList)
    //for each key,value pair in resource list, get the value 
    count = 1;
    for(i = 0; i <= trainingList.length - 1 ; i+=2){
        blockSection = {
            "text": {
                "type": "mrkdwn",
                "text": `${trainingList[i]}`
            },
            "description": {
                "type": "mrkdwn",
                "text": `${trainingList[i+1]}`
            },
            "value": `value-${count}`
        };
        count++;
        optionList.push(blockSection);
    }
    console.log(optionList)
	
	await app.client.chat.postEphemeral({
			token: process.env.SLACK_BOT_TOKEN,
			channel: body.channel_id,
			user: body.user_id,
            "blocks": [
                {
                    "type": "divider"
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "Please complete the following instructions and when completed check the correct boxes!"
                    },
                    "accessory": {
                        "type": "checkboxes",
                        "options": optionList,
                        "action_id": "training-checkboxes-action"
                    }
                }
            
            ]
	})
};

module.exports = callTraining;