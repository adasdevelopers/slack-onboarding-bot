require("dotenv").config();
const {database} = require("../config/constants")
const _ = require('lodash');
const callUpdateRoles = async (app, ack, body, client, database, workspaceChecker, adminList) => {
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
                        "callback_id": "rolesView",
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
                                "type": "section",
                                "text": {
                                    "type": "mrkdwn",
                                    "text": "To Delete a Role Push Me."
                                },
                                "accessory": {
                                    "type": "button",
                                    "text": {
                                        "type": "plain_text",
                                        "text": "Click Me!",
                                        "emoji": true
                                    },
                                    "value": "click_me_123",
                                    "action_id": "delete-role-action"
                                }
                            },
                            {
                                "type": "section",
                                "text": {
                                    "type": "mrkdwn",
                                    "text": "To Add a New Role Push Me."
                                },
                                "accessory": {
                                    "type": "button",
                                    "text": {
                                        "type": "plain_text",
                                        "text": "Click Me!",
                                        "emoji": true
                                    },
                                    "value": "click_me_123",
                                    "action_id": "add-role-action"
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

const callUpdateAddRolesView = async (app, ack, body, client) => {
    await ack();
    //console.log(body)
    const result = await client.views.update({
        view_id : body.view.id,
        hash: body.view.hash,
        view: {
            "type": "modal",
            "callback_id":"add_roles_view_submission",
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
                        "type": "plain_text_input",
                        "action_id": "new_role_title_action"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Write the New Role Title!",
                        "emoji": true
                    }
                },
                {
                    "type": "input",
                    "element": {
                        "type": "plain_text_input",
                        "multiline": true,
                        "action_id": "new_role_description_action"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Write the New Role Guidelines!",
                        "emoji": true
                    }
                }
            ]
        }
    })
};

const callUpdateDeleteRolesView = async (app, ack, body, client) => {
    await ack();

    
    
    const result = await client.views.update({
        view_id : body.view.id,
        hash: body.view.hash,
        view: {
            "type": "modal",
            "callback_id": "delete_roles_view_submission",
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
                        "type": "plain_text_input",
                        "action_id": "delete-action"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Write the Role Number to be Deleted",
                        "emoji": true
                    }
                }
            ]
        }
    })
};

const deleteRoles = async(app,ack, body, view, context, database, workspaceChecker) =>{
    await ack();
    console.log('deleteRoles has been called')
    user= body['user']['id']
    msg = 'A Role has been successfully deleted';
    val = view['state']['values']
    console.log(val)
    for (const property in val){
        console.log(val[property]['delete-action'].value)
        roleNum = val[property]['delete-action'].value
    }
    for (const property in workspaceChecker) {
        if (property == body.team.domain) {
            workspaceID = workspaceChecker[property]
        }
      }
    database[workspaceID].roles.splice(`${2*roleNum-2}`,2)
    console.log('this role in the database will be deleted',database[workspaceID].roles[2*roleNum-2]);
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

const addRoles = async(app,ack, body, view, context, database, workspaceChecker) => {
    await ack();
    console.log('addRoles has been called')
    user= body['user']['id']
    msg = 'Role has been successfully added';
    val = view['state']['values']
    console.log(val)
    count = 0;
    for (const property in workspaceChecker) {
        if (property == body.team.domain) {
            workspaceID = workspaceChecker[property]
        }
      }
    for (const property in val){
        if(count == 0){
            console.log(val[property]['new_role_title_action'].value)
            roleTitle = val[property]['new_role_title_action'].value
            database[workspaceID].roles.push(roleTitle)
        }
        else if(count == 1){
            console.log(val[property]['new_role_description_action'].value)
            roleDescription = val[property]['new_role_description_action'].value
            database[workspaceID].roles.push(roleDescription)
        }
        count++;
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
}

const ackRolesView = async(app, ack, body, view, context) => {
    await ack();
    user = body['user']['id'];
    msg = 'this has been successfully submitted';
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
}
module.exports = {callUpdateRoles, callUpdateAddRolesView, callUpdateDeleteRolesView, addRoles, deleteRoles, ackRolesView}