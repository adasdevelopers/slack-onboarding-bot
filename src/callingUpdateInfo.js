require("dotenv").config();
const { updateInfo } = require('../config/constants.js');

const callUpdateInfo = async (app, ack, body, say) => { 
    await ack();
    await app.client.chat.postEphemeral({
        token: process.env.SLACK_BOT_TOKEN,
        channel: body.channel_id,
        user: body.user_id,
        blocks: [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": updateInfo.text
                },
                "accessory": {
                    "type": "button",
                    "style": "primary",
                    "text": {
                        "type": "plain_text",
                        "text": "Update :smile:",
                        "emoji": true
                    },
                    "value": "update_info_urls",
                    "url": updateInfo.url,
                    "action_id": "update-info-button-action"
                }
            }
        ]
})
    
}


module.exports = callUpdateInfo;