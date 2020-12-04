require("dotenv").config();
const {database} = require("../config/constants")
var rules = 'No Rules Currently Set'


const callWorkspaceRules = async (app, ack, body, database, workspaceChecker) => {
	await ack();
	console.log(workspaceChecker)
	blockList= []
	const beforeRules = {
		"type": "section",
		"text": {
			"type": "mrkdwn",
			"text": "*RULES*\nIn the interest of fostering an open and welcoming environment, we all pledge to making participation in our discord server and our community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation."
		}
	}
	blockList.push(beforeRules)
	
	for (const [key, value] of Object.entries(workspaceChecker)) {
        if (key == body.team_domain) {
          workspaceID = value
        }
	  }
	const workspaceObject = database[workspaceID];
	ruleList = ''
	for(i = 0; i < workspaceObject.workspaceRules.length; i++){
		ruleList = ruleList + workspaceObject.workspaceRules[i] + "\n"
	}
	ruleSection = {
		"type": "section",
		"text": {
			"type": "mrkdwn",
			"text": ruleList
		}
	}
	blockList.push(ruleSection)
	const afterRules = {
		"type": "section",
		"text": {
			"type": "mrkdwn",
			"text": "\n⚖️*ENFORCEMENT*\nInstances of abusive, harassing, or otherwise unacceptable behaviour may be reported by contacting the Workspace Admins 🔑 . All complaints will be reviewed and investigated and will result in a response that is deemed necessary and appropriate to the circumstances. Overall though, there is a no-tolerance policy where anything that is in direct violation of the rules mentioned above will result in an immediate permanent ban.\n\nPlease note that the Workspace Admins 🔑 and Ada's Team are obligated to maintain confidentiality with regard to the reporter of an incident. Those part of the Workspace Admins 🔑  and Ada's Team who do not follow or enforce the Code of Conduct in good faith may face temporary or permanent repercussions as determined by other members of the student group leadership.\n"
		}
	}
	blockList.push(afterRules)
	await app.client.chat.postEphemeral({
			token: process.env.SLACK_BOT_TOKEN,
			channel: body.channel_id,
			user: body.user_id,
			blocks:blockList
	})
};

module.exports = callWorkspaceRules