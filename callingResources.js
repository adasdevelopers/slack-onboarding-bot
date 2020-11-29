require("dotenv").config();

const callResources = async (app, ack, body) => {
	await ack();
	await app.client.chat.postEphemeral({
			token: process.env.SLACK_BOT_TOKEN,
			channel: body.channel_id,
			user: body.user_id,
			text: "Resources"
	})
};

module.exports = callResources;