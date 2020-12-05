require("dotenv").config();
const {database} = require("../config/constants")
const _ = require('lodash');


const callWorkspaceRules = async (app, ack, body, database, workspaceChecker) => {
	await ack();
	blockList= []
	const beforeRules = {
		"type": "section",
		"text": {
			"type": "mrkdwn",
			"text": "*RULES*\nIn the interest of fostering an open and welcoming environment, we all pledge to making participation in our discord server and our community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation."
		}
	}
	blockList.push(beforeRules)
	
	for (const [key, value] of Object.entries(workspaceChecker)) {
        if (key == body.team_domain) {
          workspaceID = value
        }
	  }
	const workspaceObject = database[workspaceID];
	ruleList = ''
	for(i = 0; i < workspaceObject.workspaceRules.length; i++){
		ruleList = ruleList + workspaceObject.workspaceRules[i] + "\n"
	}
	ruleSection = {
		"type": "section",
		"text": {
			"type": "mrkdwn",
			"text": ruleList
		}
	}
	blockList.push(ruleSection)
	const afterRules = {
		"type": "section",
		"text": {
			"type": "mrkdwn",
			"text": "\n⚖️*ENFORCEMENT*\nInstances of abusive, harassing, or otherwise unacceptable behaviour may be reported by contacting the Workspace Admins 🔑 . All complaints will be reviewed and investigated and will result in a response that is deemed necessary and appropriate to the circumstances. Overall though, there is a no-tolerance policy where anything that is in direct violation of the rules mentioned above will result in an immediate permanent ban.\n\nPlease note that the Workspace Admins 🔑 and Ada's Team are obligated to maintain confidentiality with regard to the reporter of an incident. Those part of the Workspace Admins 🔑  and Ada's Team who do not follow or enforce the Code of Conduct in good faith may face temporary or permanent repercussions as determined by other members of the student group leadership.\n"
		}
	}
	blockList.push(afterRules)
	await app.client.chat.postEphemeral({
			token: process.env.SLACK_BOT_TOKEN,
			channel: body.channel_id,
			user: body.user_id,
			blocks:blockList
	})
};
const callWorkspaceRulesView = async(app, ack, body, view, context, database, workspaceChecker) => {
    await ack();
    user = body['user']['id'];
    msg = 'workspaceRulesView has been successfully submitted';
    val = view['state']['values']
    count = 0
    for(const property in val){
        if(count == 0){
            selection = val[property]['rule_change_selection'].selected_option.text.text
        }else if(count == 1){
            ruleNum = val[property]['rule_num_selection'].value
            ruleNum = Number(ruleNum)
        }else{
            newRule = val[property]['new_rule'].value
        }count++;
    }
    
    for (const property in workspaceChecker) {
        if (property == body.team.domain) {
            workspaceID = workspaceChecker[property]
        }
	  }
    if(selection == 'Replace Rule'){
        database[workspaceID].workspaceRules[ruleNum-1] = `${newRule}`;
    }else if(selection == 'New Rule'){
        database[workspaceID].workspaceRules.push(`${newRule}`);
    }else if(selection == 'Delete Rule'){
        database[workspaceID].workspaceRules.splice(`${ruleNum-1}`,1);
    }

    try {
        await app.client.chat.postMessage({
          token: context.botToken,
          channel: user,
          text: msg
        });
      }
      catch (error) {
        console.error(error);
      }
};

const callUpdateWorkspaceRules = async (app, ack, body, client, database, workspaceChecker, adminList) => {
	client.s
    await ack();
    var adminsID = _.map(adminList,userAdmin => userAdmin.id)
    if (adminsID.includes(body.user_id)){
        try {
                const result = await client.views.open({
                    trigger_id: body.trigger_id,
                    // Payload
                     view: {
                        "type": "modal",
                        "callback_id" : 'workspaceRulesView',
                        "title": {
                            "type": "plain_text",
                            "text": "My App",
                            "emoji": true
                        },
                        "submit": {
                            "type": "plain_text",
                            "text": "Submit",
                            "emoji": true
                        },
                        "close": {
                            "type": "plain_text",
                            "text": "Cancel",
                            "emoji": true
                        },
                        "blocks": [
                            {
                                "type": "input",
                                "element": {
                                    "type": "static_select",
                                    "placeholder": {
                                        "type": "plain_text",
                                        "text": "Select an item",
                                        "emoji": true
                                    },
                                    "options": [
                                        {
                                            "text": {
                                                "type": "plain_text",
                                                "text": "Replace Rule",
                                                "emoji": true
                                            },
                                            "value": "value-0"
                                        },
                                        {
                                            "text": {
                                                "type": "plain_text",
                                                "text": "New Rule",
                                                "emoji": true
                                            },
                                            "value": "value-1"
                                        },
                                        {
                                            "text": {
                                                "type": "plain_text",
                                                "text": "Delete Rule",
                                                "emoji": true
                                            },
                                            "value": "value-2"
                                        }
                                    ],
                                    "action_id": "rule_change_selection"
                                },
                                "label": {
                                    "type": "plain_text",
                                    "text": "Select Rule Changing Option",
                                    "emoji": true
                                }
                            },
                            {
                                "dispatch_action": true,
                                "type": "input",
                                "element": {
                                    "type": "plain_text_input",
                                    "dispatch_action_config": {
                                        "trigger_actions_on": [
                                            "on_character_entered"
                                        ]
                                    },
                                    "action_id": "rule_num_selection"
                                },
                                "label": {
                                    "type": "plain_text",
                                    "text": "If you Selected Replace/Delete Rule, Enter a Number to Select the Rule to be Replaced/Deleted",
                                    "emoji": true
                                }
                            },
                            {
                                "type": "input",
                                "element": {
                                    "type": "plain_text_input",
                                    "multiline": true,
                                    "action_id": "new_rule"
                                },
                                "label": {
                                    "type": "plain_text",
                                    "text": "Enter the New/Replacing rule.",
                                    "emoji": true
                                }
                            }
                        ]
                    }
                    
                });
                // console.log(result);
                }
            catch (error) {
                console.error(error);
            }
    }
    else{
        try {
            await app.client.chat.postMessage({
              token: context.botToken,
              channel: user,
              text: msg
            });
          }
          catch (error) {
            console.error(error);
          }
        /// Not Authorized User /////
    }
};

module.exports = {callWorkspaceRules, callWorkspaceRulesView, callUpdateWorkspaceRules}