require("dotenv").config();
const {database} = require("../config/constants")
const callRoles = async (app, ack, body, database, workspaceChecker, roles) => {
    await ack();
    blockList =[]
    var roles_type = ''
    for (const [key, value] of Object.entries(workspaceChecker)) {
        if (key == body.team_domain) {
          workspaceID = value
        }
	}
    const workspaceObject = database[workspaceID];
    console.log(workspaceObject.roles)
    if(workspaceID == 'adasteam'){
        //ADASTEAM FOR LOOP
        for(i = 0; i < workspaceObject.roles.length; i++){
            blockList.push({
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `${workspaceObject.roles[i]}`
                }
            })
        }
    }else{
        for(i = 0; i < workspaceObject.roles.length; i+= 2){
            blockList.push({
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `*${workspaceObject.roles[i]} :*\n    ${workspaceObject.roles[i+1]}`
                }
            })
        }
        //NORMAL ROLE FOR LOOP
    }
    console.log(workspaceObject.roles)
      await app.client.chat.postEphemeral({
        token: process.env.SLACK_BOT_TOKEN,
        channel: body.channel_id,
        user: body.user_id,
        blocks : blockList
    })
}

module.exports = callRoles