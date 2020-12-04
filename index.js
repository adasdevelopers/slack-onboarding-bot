//Import all necessary files
const { App } = require("@slack/bolt");
const { forEach } = require("lodash");
require("dotenv").config();
const _ = require('lodash');
const callFaq = require("./src/callingFaq");
const callResources = require('./src/callingResources');
const callTraining = require('./src/callingTraining');
const callUpdateInfo = require('./src/callingUpdateInfo');
const { updateInfo } = require('./config/constants');
const callAdmins = require("./src/callingAdmins");
const callWelcomeMessage = require("./src/callingWelcomeMessage");
const {callWorkspaceRules, callWorkspaceRulesView, callUpdateWorkspaceRules} = require("./src/callingWorkspaceRules");
const {database, workspaceChecker} = require('./config/constants');
const callRoles = require("./src/callingRoles");
const {callUpdateRoles,callUpdateAddRolesView, callUpdateDeleteRolesView,addRoles, deleteRoles} = require("./src/callingUpdateRoles");
// const callUpdateAddRolesViews = require('./src/callingUpdateAddRolesView');
// const callUpdateDeleteRolesViews = require('./src/callingUpdateDeleteRolesView');
//Initialize the application
const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
  name: "Ada's Bot",
});

//console.log(app.auth.test(process.env.SLACK_BOT_TOKEN))

(async () => {
    await app.start(process.env.PORT); // Starts the bot
    console.log("Bot is listening on port " + process.env.PORT);
})();


app.command('/update_workspace_rules',  async ({ ack, body, client }) =>  callUpdateWorkspaceRules(app, ack, body, client, database, workspaceChecker, adminList))

app.view('workspaceRulesView', async({ack, body, view, context}) => callWorkspaceRulesView(app, ack, body, view, context, database, workspaceChecker));


//app.command calls the the callWorkspaceRules function
app.command('/workspace_rules', async({ack , body, say}) => callWorkspaceRules(app, ack, body, database, workspaceChecker) )
//app.command calls the callResources function
app.command('/resources', async({ack, body, say}) => callResources(app, ack, body, workspaceChecker, database));
//this button responds to an action taking place from the user selecting the button generated from resources
app.action('resource-button-action', async ({ ack, say }) => {
    await ack();
    // Responds to button from resources
  });
//appcommand calls the callFaq function
app.command('/faq', async ({ack, body, say}) => callFaq(app, ack, body));

app.command('/update_roles',  async ({ ack, body, client }) => callUpdateRoles(app, ack, body, client, database, workspaceChecker, adminList))

app.action('delete-role-action', async({ack, body, client}) => callUpdateDeleteRolesView(app, ack, body, client))

app.view('delete_roles_view_submission', async({ack,body,view,context}) => deleteRoles(app,ack, body, view, context, database, workspaceChecker));


app.action('add-role-action', async({ack, body, client}) => callUpdateAddRolesView(app, ack, body, client))

app.view('add_roles_view_submission', async({ack,body, view,context }) => addRoles(app,ack, body, view, context, database, workspaceChecker));

app.view('rolesView', async({ack, body, view, context}) =>{
    await ack;
    console.log("rolesView submission was returned")
})

var roles = '';

app.command('/roles', async ({ ack, body, say }) =>  callRoles(app, ack, body, database, workspaceChecker, roles))

app.command('/training', async ({ack, body, say}) => callTraining(app, ack, body,database, workspaceChecker))
app.action('training-checkboxes-action', async ({ ack, body, say }) => {
    await ack();
    });
    // Responds to button from resources;
    
var adminList = [];
app.command('/admins', async ({ ack, body, say }) => callAdmins( ack, body, say, adminList, app))

app.command('/update_info', async({ ack, body, say}) => callUpdateInfo( app, ack, body, say))
// Command to display button to update info at link
app.action('update-info-button-action', async ({ ack, say }) => {
    await ack();
    // Responds to button from update-info
  });
app.event('member_joined_channel', async ({event, client, context}) => callWelcomeMessage(event ,client,  context,  app));




var adminList = {};

async function fetchUsers() {
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
fetchUsers();
