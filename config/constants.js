const updateInfo = {
    "text": "Here is how you update your personal info:",
    "url": "https://www.adasteam.ca"
}

database = {
    "adasmentors" : {
        welcomeMessage : 
            "Welcome to the Adas Mentors workspace! The goal of Adas Mentors is to mentor underprivileged students lacking the confidence and exposure to university and the application process.",
        workspaceRules : ['Currently there are no rules in this Workspace'],
        roles : [],
        training : ['*Who Are You?*','Under [What I do] please describe your field (ie, high school student, undergraduate student, graduate student, alumni, industry partner, or Adas Mentor organizer)'],
        resources : {
            adasMentorsWebsite:{
                url: "https://sites.google.com/ualberta.ca/adas-mentors-wiki/home", 
                text: "Check out Adas Mentors Wiki Home "
            }},
        acknowledgements : {
            body : "We respectfully acknowledge that Adas Mentors is located on Treaty 6 territory. Treaty 6 is a traditional gathering place for diverse Indigenous peoples including the Cree, Blackfoot, Metis, Nakota Sioux, Iroquois, Dene, Ojibway/Saulteaux/Anishinaabe, Inuit, and many others whose histories, languages, and cultures continue to influence our vibrant community.", 
            sig:  "Created by Adas Developers ", 
            url: "https://github.com/adasdevelopers/slack-onboarding-bot"
        }
    },
    "adasdevelopers" : {
        welcomeMessage : "Welcome to Adas Developers! This workspace was created for the Adas Developers initiative, where students come together to create software! This workspace is accessible to software developers, designers, project managers, mentors, and administrators. If you have any questions, refer to this resource or ask one of the administrators for help!",
        workspaceRules : [
            '✔️DO Use welcoming language and inclusive language', 
            '✔️DO Be respectful of differing viewpoints and experiences' , 
            '✔️DO Gracefully accept constructive criticism', 
            '✔️DO Focus on what is best for the community', 
            '✔️DO Show empathy towards other community members', 
            '✔️DO NOT Use sexualized language or imagery', 
            '✔️DO NOT Initiate sexual attention or advances' , 
            '❌DO NOT Engage in trolling or make insulting/derogatory comments', 
            '❌DO NOT Attack personal or political values', 
            '❌DO NOT Engage in public or private harassment', 
            '❌DO NOT Publish others private information, such as a physical or electronic address ', 
            '❌DO NOT Engage in any other conduct which could reasonably be considered inappropriate in a professional setting'],
        roles : [],
        training : [],
        resources : {}, 
        acknowledgements : {
            body : "We respectfully acknowledge that Adas Developers is located on Treaty 6 territory. Treaty 6 is a traditional gathering place for diverse Indigenous peoples including the Cree, Blackfoot, Metis, Nakota Sioux, Iroquois, Dene, Ojibway/Saulteaux/Anishinaabe, Inuit, and many others whose histories, languages, and cultures continue to influence our vibrant community.", 
            sig:  "Created by Adas Developers ", 
            url: "https://github.com/adasdevelopers/slack-onboarding-bot"}
    },
    "adasteam" :{
        welcomeMessage : "Welcome to Adas Team! The Adas Team workspace is for the executives to collaborate, ask questions, and fulfill Adas Team initiatives. Although everyone has their VP roles to complete, the Adas Team executive committee is meant to be a safe space; if you are struggling with your work, please ask others for help! Congrats, and thanks for joining our team. We're so happy to have you here with us!",
        workspaceRules : ['View our constitution, under Article 4 for the official rules and duties of an Adas Team executive:  https://drive.google.com/file/d/1ntfk7iUron6_jWnJSkhcQnpyn7iQbMy2/view?usp=sharing'],
        roles : [],
        training : ['*Executive Position*','Under [What I Do], please write your executive position'],
        resources : {
            adasTeamExecResourceWebsite : {
                url : "https://sites.google.com/ualberta.ca/adas-team-wiki/home", 
                text : "Check out Adas Team Wiki Home "}},
        acknowledgements : {body : "We respectfully acknowledge that Adas Team is located on Treaty 6 territory.Treaty 6 is a traditional gathering place for diverse Indigenous peoples including the Cree, Blackfoot, Metis, Nakota Sioux, Iroquois, Dene, Ojibway/Saulteaux/Anishinaabe, Inuit, and many others whose histories, languages, and cultures continue to influence our vibrant community.", sig:  "Created by Adas Developers ", url: "https://github.com/adasdevelopers/slack-onboarding-bot"}
    },
    "adasnetwork": {
        welcomeMessage : "Welcome to Adas Network! This workspace was created to keep those involved with Adas Team, past or present, connected. It’s a supportive network that strives to provide a space for knowledge and opportunities to be shared with one another that empower our academic or career choices. We are so happy to have you here with us!",
        workspaceRules : [
            '✔️DO Use welcoming language and inclusive language', 
            '✔️DO Be respectful of differing viewpoints and experiences' , 
            '✔️DO Gracefully accept constructive criticism', 
            '✔️DO Focus on what is best for the community', 
            '✔️DO Show empathy towards other community members', 
            '✔️DO NOT Use sexualized language or imagery', 
            '✔️DO NOT Initiate sexual attention or advances' , 
            '❌DO NOT Engage in trolling or make insulting/derogatory comments', 
            '❌DO NOT Attack personal or political values', 
            '❌DO NOT Engage in public or private harassment', 
            '❌DO NOTPublish others private information, such as a physical or electronic address ', 
            '❌DO NOT Engage in any other conduct which could reasonably be considered inappropriate in a professional setting'],
        roles : [],
        training : ['*Introduce Yourself!*','Please introduce yourself in the #introductions channel, and your relationship with Adas Team!'],
        resources : {},
        acknowledgements : {body : "We respectfully acknowledge that Adas Network is located on Treaty 6 territory. Treaty 6 is a traditional gathering place for diverse Indigenous peoples including the Cree, Blackfoot, Metis, Nakota Sioux, Iroquois, Dene, Ojibway/Saulteaux/Anishinaabe, Inuit, and many others whose histories, languages, and cultures continue to influence our vibrant community.", sig:  "Created by Adas Developers ", url: "https://github.com/adasdevelopers/slack-onboarding-bot"}
    
    },
    "adasconference": {
        welcomeMessage : "Welcome to Adas Network! This workspace was created to keep those involved with Adas Team, past or present, connected. It’s a supportive network that strives to provide a space for knowledge and opportunities to be shared with one another that empower our academic or career choices. We’re so happy to have you here with us!",
        workspaceRules : [
            '✔️DO Use welcoming language and inclusive language', 
            '✔️DO Be respectful of differing viewpoints and experiences' , 
            '✔️DO Gracefully accept constructive criticism', 
            '✔️DO Focus on what is best for the community', 
            '✔️DO Show empathy towards other community members', 
            '✔️DO NOT Use sexualized language or imagery', 
            '✔️DO NOT Initiate sexual attention or advances' , 
            '❌DO NOT Engage in trolling or make insulting/derogatory comments', 
            '❌DO NOT Attack personal or political values', 
            '❌DO NOT Engage in public or private harassment', 
            '❌DO NOTPublish others private information, such as a physical or electronic address ', 
            '❌DO NOT Engage in any other conduct which could reasonably be considered inappropriate in a professional setting'],
        roles : [],
        training : [],
        resources : {},
        acknowledgements : {
            body : "We respectfully acknowledge that Ada’s Network is located on Treaty 6 territory. Treaty 6 is a traditional gathering place for diverse Indigenous peoples including the Cree, Blackfoot, Metis, Nakota Sioux, Iroquois, Dene, Ojibway/Saulteaux/Anishinaabe, Inuit, and many others whose histories, languages, and cultures continue to influence our vibrant community.", 
            sig:  "Created by Ada’s Developers ", 
            url: "https://github.com/adasdevelopers/slack-onboarding-bot"}
    
    }
}
workspaceChecker = {
    'adas-teamworkspace' : "adasteam",
    'adas-developerworkspace': "adasdevelopers",
    'adas-mentorsworkspace': "adasmentors",
    'adas-networkworkspace' : "adasnetwork",
    'adas-conferenceworkspace' : "adasconference"
}


//console.log(database.adasnetwork.welcomeMessage)
module.exports = { updateInfo, database, workspaceChecker }

