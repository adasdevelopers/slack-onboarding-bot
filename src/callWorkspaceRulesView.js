const callWorkspaceRulesView = async(app, ack, body, view, context, database, workspaceChecker) => {
    await ack();
    console.log(Object.keys(workspaceChecker))
    user = body['user']['id'];
    msg = 'workspaceRulesView has been successfully submitted';
    val = view['state']['values']
    //console.log(val)
    count = 0
    for(const property in val){
        if(count == 0){
            //console.log(val[property]['rule_change_selection'].selected_option.text.text);
            selection = val[property]['rule_change_selection'].selected_option.text.text
        }else if(count == 1){
            //console.log(val[property]['rule_num_selection'].value)
            ruleNum = val[property]['rule_num_selection'].value
            ruleNum = Number(ruleNum)
        }else{
            //console.log(val[property]['new_rule'].value)
            newRule = val[property]['new_rule'].value
        }count++;
    }
    //console.log(workspaceChecker)
    //console.log(body.team.domain)
    for (const property in workspaceChecker) {
        console.log(property)
        if (property == body.team.domain) {
            //console.log(workspaceChecker[property])
            workspaceID = workspaceChecker[property]
        }
	  }
	console.log(database[workspaceID])
    if(selection == 'Replace Rule'){
        database[workspaceID].workspaceRules[ruleNum-1] = `${newRule}`;
    }else if(selection == 'New Rule'){
        database[workspaceID].workspaceRules.splice(`${ruleNum}`,0,`${newRule}`);
    }else if(selection == 'Delete Rule'){
        database[workspaceID].workspaceRules.splice(`${ruleNum-1}`,1);
    }

    // console.log(ruleNum);
    // console.log(newRule);
    // console.log(selectedObject);
    try {
        await app.client.chat.postMessage({
          token: context.botToken,
          channel: user,
          text: msg
        });
      }
      catch (error) {
        console.error(error);
      }
}
module.exports = callWorkspaceRulesView
