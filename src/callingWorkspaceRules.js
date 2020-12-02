require("dotenv").config();

var rules = 'No Rules Currently Set'

const callWorkspaceRules = async (app, ack, body) => {
	await ack();
	await app.client.chat.postEphemeral({
			token: process.env.SLACK_BOT_TOKEN,
			channel: body.channel_id,
			user: body.user_id,
			blocks:[ 
				{
					"type": "section",
					"text": {
						"type": "mrkdwn",
						"text": `*Current Workspace Rules:* \n ${rules}`
					}
				}

			]
	})
};

module.exports = callWorkspaceRules