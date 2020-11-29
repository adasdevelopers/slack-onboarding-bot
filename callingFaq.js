require("dotenv").config();

const callFaq = async (app, ack, body) => {
	await ack();
	await app.client.chat.postEphemeral({
			token: process.env.SLACK_BOT_TOKEN,
			channel: body.channel_id,
			user: body.user_id,
			text: "Read our FAQ here https://www.adasteam.ca/faq"
	})
};

module.exports = callFaq 