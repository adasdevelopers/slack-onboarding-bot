require("dotenv").config();

const callResources = async (app, ack, body) => {
	await ack();
	await app.client.chat.postEphemeral({
			token: process.env.SLACK_BOT_TOKEN,
			channel: body.channel_id,
			user: body.user_id,
            //text: "If this is your first time using Slack and you're confused by its interface, learn more about it here: https://slack.com/resources/slack-101 ",
            "blocks": [
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
                }
            ]
	})
};

module.exports = callResources;