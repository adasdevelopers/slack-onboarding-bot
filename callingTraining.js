require("dotenv").config();

const callTraining = async (app, ack, body) => {
	await ack();
	await app.client.chat.postEphemeral({
			token: process.env.SLACK_BOT_TOKEN,
			channel: body.channel_id,
			user: body.user_id,
			text: "read training material Here!"
	})
};

module.exports = callTraining;