const { App } = require("@slack/bolt");
const { forEach } = require("lodash");
require("dotenv").config();
const _ = require('lodash');

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
  name: "Ada's Bot"
});

(async () => {
    await app.start(process.env.PORT); // Starts the bot
    console.log("Bot is listening on port " + process.env.PORT);
})();

app.command('/update_workspace_rules',  async ({ ack, body, client }) => {
    client.s
    await ack();
    var adminsID = _.map(adminList,userAdmin => userAdmin.id)
    if (adminsID.includes(body.user_id)){
        try {
                const result = await client.views.open({
                    trigger_id: body.trigger_id,
                    // Payload
                    view: {
                    type: 'modal',
                    callback_id: 'view_1',
                    title: {
                        type: 'plain_text',
                        text: 'Update Workspace Rules'
                    },
                    blocks: [
                        {
                        type: 'input',
                        block_id: 'input_c',
                        label: {
                            type: 'plain_text',
                            text: 'Rules'
                        },
                        element: {
                            type: 'plain_text_input',
                            action_id: 'inputField',
                            multiline: true
                        }
                        }
                    ],
                    submit: {
                        type: 'plain_text',
                        text: 'Submit'
                    }
                    }
                });
                // console.log(result);
                }
            catch (error) {
                console.error(error);
            }
    }
    else{
                // try {
        //     await app.client.chat.postMessage({
        //       token: context.botToken,
        //       channel: user,
        //       text: msg
        //     });
        //   }
        //   catch (error) {
        //     console.error(error);
        //   }
        ///// Not Authorized User /////
    }
});

var rules = 'No Rules Currently Set'
app.view('view_1', async ({ ack, body, view, context }) => {
    await ack();
    const val = view['state']['values']['input_c'];
    const user = body['user']['id'];
    rules = val.inputField.value

    // Message to send to the sending user
    let msg = '';
      msg = 'Your submission was successful';

    // Message
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

});

app.command('/workspace_rules', async ({ ack, body, say }) => {
    await ack();
    // const regex = "\n* /gi"
    // console.log(rules.replace(regex,"\n"))
    await app.client.chat.postEphemeral({
        token: process.env.SLACK_BOT_TOKEN,
        channel: body.channel_id,
        user: body.user_id,
        text: `*Current Workspace Rules:* \n ${rules}`
    })

})

app.command('/resources', async ({ ack, body, say }) => {
    await ack();
    console.log("Resources")
    await app.client.chat.postEphemeral({
        token: process.env.SLACK_BOT_TOKEN,
        channel: body.channel_id,
        user: body.user_id,
        text: `Resources`
    })

})

app.command('/faq', async ({ ack, body, say }) => {
    await ack();
    await app.client.chat.postEphemeral({
        token: process.env.SLACK_BOT_TOKEN,
        channel: body.channel_id,
        user: body.user_id,
        text: "Read our FAQ here https://www.adasteam.ca/faq"
    })
})

app.command('/update_roles',  async ({ ack, body, client }) => {
    console.log(body)
    await ack();
    var adminsID = _.map(adminList,userAdmin => userAdmin.id)
    if (adminsID.includes(body.user_id)){
        try {
                const result = await client.views.open({
                    trigger_id: body.trigger_id,
                    view: {
                    type: 'modal',
                    callback_id: 'view_2',
                    title: {
                        type: 'plain_text',
                        text: 'Update Workspace Roles'
                    },
                    blocks: [
                        {
                            "type": "input",
                            block_id: 'input_td',
                            "element": {
                                "type": "plain_text_input",
                                "action_id": "title",
                                "placeholder": {
                                    "type": "plain_text",
                                    "text": "Input text here to update your first role"
                                }
                            },
                            "label": {
                                "type": "plain_text",
                                "text": "Title"
                            }
                        },

                        {
                        type: 'input',
                        block_id: 'input_d',
                        label: {
                            type: 'plain_text',
                            text: 'Description'
                        },
                        element: {
                            type: 'plain_text_input',
                            action_id: 'inputField',
                            multiline: true
                        }
                        },

                        {
                            "type": "input",
                            block_id: 'input_te',
                            "element": {
                                "type": "plain_text_input",
                                "action_id": "title",
                                "placeholder": {
                                    "type": "plain_text",
                                    "text": "Input text here to update your second role"
                                }
                            },
                            "label": {
                                "type": "plain_text",
                                "text": "Title"
                            }
                        },

                        {
                        type: 'input',
                        block_id: 'input_e',
                        label: {
                            type: 'plain_text',
                            text: 'Description'
                        },
                        element: {
                            type: 'plain_text_input',
                            action_id: 'inputField',
                            multiline: true
                        }
                        },


                        {
                            "type": "input",
                            block_id: 'input_tf',
                            "element": {
                                "type": "plain_text_input",
                                "action_id": "title",
                                "placeholder": {
                                    "type": "plain_text",
                                    "text": "Input text here to update your third role"
                                }
                            },
                            "label": {
                                "type": "plain_text",
                                "text": "Title"
                            }
                        },

                        {
                        type: 'input',
                        block_id: 'input_f',
                        label: {
                            type: 'plain_text',
                            text: 'Description'
                        },
                        element: {
                            type: 'plain_text_input',
                            action_id: 'inputField',
                            multiline: true
                        }
                        },
                    ],
                    submit: {
                        type: 'plain_text',
                        text: 'Submit'
                    }
                    }
                });
                // console.log(result);
                }
            catch (error) {
                console.error(error);
            }
    }
    else{
        // try {
        //     await app.client.chat.postMessage({
        //       token: context.botToken,
        //       channel: user,
        //       text: msg
        //     });
        //   }
        //   catch (error) {
        //     console.error(error);
        //   }
        ///// Not Authorized User /////
    }
});

var roles = ''
app.view('view_2', async ({ ack, body, view, context }) => {
    await ack();
    const key1 = view['state']['values']['input_td']['title']['value'];
    const val1 = view['state']['values']['input_d']['inputField']['value'];
    const key2 = view['state']['values']['input_te']['title']['value'];
    const val2 = view['state']['values']['input_e']['inputField']['value'];
    const key3 = view['state']['values']['input_tf']['title']['value'];
    const val3 = view['state']['values']['input_f']['inputField']['value'];

    roles = {}
    roles[key1] = val1;
    roles[key2] = val2;
    roles[key3] = val3;

    const user = body['user']['id'];
    // rules = val.inputField.value

    let msg = '';

    msg = 'Your submission was successful';


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
});


app.command('/roles', async ({ ack, body, say }) => {
    await ack();
    var roles_type = ''
    for (const [key, value] of Object.entries(roles)) {
        // console.log(`${key}: ${value}`);
        roles_type += `*${key}*: \n ${value} \n\n`
      }
      await app.client.chat.postEphemeral({
        token: process.env.SLACK_BOT_TOKEN,
        channel: body.channel_id,
        user: body.user_id,
        text: `The following admins of this workspace are: \n ${(roles_type)}`
    })
})

app.command('/training', async ({ ack, body, say }) => {
    await ack();
    console.log(body)
    await app.client.chat.postEphemeral({
        token: process.env.SLACK_BOT_TOKEN,
        channel: body.channel_id,
        user: body.user_id,
        text: `Training`
    })
})

var adminList = [];
app.command('/admins', async ({ ack, body, say }) => {
    await ack();
    fetchUsers();
    // Returns the admin name
    var admins = adminList.map(admin => admin.real_name)
    await app.client.chat.postEphemeral({
        token: process.env.SLACK_BOT_TOKEN,
        channel: body.channel_id,
        user: body.user_id,
        text: `The following admins of this workspace are: \n ${(admins.join('\n'))}`
    })
})

const { updateInfo } = require('./config/constants')

app.command('/update_info', async ({ ack, body, say }) => {
    await ack();
    try {
        await app.client.chat.postEphemeral({
            token: process.env.SLACK_BOT_TOKEN,
            channel: body.channel_id,
            user: body.user_id,
            text: updateInfo.text + " " + updateInfo.url
        })
        // const result = await app.client.views.open({
        //     token: process.env.SLACK_BOT_TOKEN,
        //     trigger_id: body.trigger_id,
        //     view: {
        //         "type": "modal",
        //         "title": {
        //             "type": "plain_text",
        //             "text": "Ada's Bot",
        //             "emoji": true
        //         },
        //         "close": {
        //             "type": "plain_text",
        //             "text": "Cancel",
        //             "emoji": true
        //         },
        //         "blocks": [
        //             {
        //                 "type": "section",
        //                 "text": {
        //                     "type": "mrkdwn",
        //                     "text": "hello"
        //                 },
        //                 "accessory": {
        //                     "type": "button",
        //                     "text": {
        //                         "type": "plain_text",
        //                         "text": "Update Info",
        //                         "emoji": true
        //                     },
        //                     "value": "click_me_123",
        //                     "url": "hello",
        //                     "action_id": "button-action"
        //                 }
        //             }
        //         ]
        //     }
        // })
    }
    catch (error) {
        console.log(error)
    }

})

var adminList = {};

async function fetchUsers() {
  try {
    const result = await app.client.users.list({
      token: process.env.SLACK_BOT_TOKEN
    });

    saveAdmins(result.members);
  }
  catch (error) {
    console.error(error);
  }
}

function saveAdmins(usersArray) {
    adminList = [];
    usersArray.map(user => {
        if (user["is_admin"] === true){
            adminList.push(user)
        }else{
        }
    })

}
fetchUsers();

app.event('member_joined_channel', async ({ event, client, context }) => {
    console.log(event)
    await app.client.chat.postMessage({
        token: process.env.SLACK_BOT_TOKEN,
        channel: event.channel,
        user: event.user,
        text: `Welcome to the team, <@${event.user}>!`
    })
});
