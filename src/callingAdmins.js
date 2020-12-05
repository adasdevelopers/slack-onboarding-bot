require("../test/node_modules/dotenv").config();
const {database, workspaceChecker}= require('../config/constants')
const callAdmins = async ( ack, body, say, adminList, app ) => {
    await ack();
    fetchUsers(app);
    // Returns the admin name
    var admins = adminList.map(admin => admin.real_name)
    await app.client.chat.postEphemeral({
        token: process.env.SLACK_BOT_TOKEN,
        channel: body.channel_id,
        user: body.user_id,
        text: `The following admins of this workspace are: \n ${(admins.join('\n'))}`
    })
}

async function fetchUsers(app) {
    try {
      const result = await app.client.users.list({
        token: process.env.SLACK_BOT_TOKEN
      });
  
      saveAdmins(result.members);
    }
    catch (error) {
      console.error(error);
    }
  }
  
  function saveAdmins(usersArray) {
      adminList = [];
      usersArray.map(user => {
          if (user["is_admin"] === true){
              adminList.push(user)
          }else{
          }
      })
  
  }

module.exports = callAdmins