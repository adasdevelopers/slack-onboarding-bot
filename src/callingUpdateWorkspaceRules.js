require("dotenv").config();
const {database} = require("../config/constants")
const _ = require('lodash');
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
                                                "text": "New Delete Rule",
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

module.exports = callUpdateWorkspaceRules