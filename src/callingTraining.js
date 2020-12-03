require("dotenv").config();
const {database, workspaceChecker} = require('../config/constants')
const callTraining = async (app, ack, body) => {
  //workspaceID = `adasmentors`
  // find the proper workspace
  for (const [key, value] of Object.entries(workspaceChecker)) {
    if (key == body.team_domain) {
      workspaceID = value
    }
  }

  const workspaceObject = database[workspaceID];

  display_blockList = workspaceObject.training
	await ack();
	await app.client.chat.postEphemeral({
			token: process.env.SLACK_BOT_TOKEN,
			channel: body.channel_id,
			user: body.user_id,
            "blocks": display_blockList
	})
};

module.exports = callTraining;
