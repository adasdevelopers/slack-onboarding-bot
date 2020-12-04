require("dotenv").config();
const callFaq = async (app, ack, body) => {
	console.log(body)
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
						"text": "Read our FAQ <https://www.adasteam.ca/faq|here!>"
					}
				}

			]
	})
};

module.exports = callFaq  