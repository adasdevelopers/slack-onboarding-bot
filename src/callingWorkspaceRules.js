require("dotenv").config();
const {database} = require("../config/constants")
var rules = 'No Rules Currently Set'


const callWorkspaceRules = async (app, ack, body) => {
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
						"text": "*RULES*\nIn the interest of fostering an open and welcoming environment, we all pledge to making participation in our discord server and our community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation."
					}
				},
				{
					"type": "section",
					"text": {
						"type": "mrkdwn",
						"text": "⚖️*ENFORCEMENT*\nInstances of abusive, harassing, or otherwise unacceptable behaviour may be reported by contacting the Workspace Admins 🔑 . All complaints will be reviewed and investigated and will result in a response that is deemed necessary and appropriate to the circumstances. Overall though, there is a no-tolerance policy where anything that is in direct violation of the rules mentioned above will result in an immediate permanent ban.\n\nPlease note that the Workspace Admins 🔑 and Ada's Team are obligated to maintain confidentiality with regard to the reporter of an incident. Those part of the Workspace Admins 🔑  and Ada's Team who do not follow or enforce the Code of Conduct in good faith may face temporary or permanent repercussions as determined by other members of the student group leadership."
					}
				}

			]
	})
};

module.exports = callWorkspaceRules