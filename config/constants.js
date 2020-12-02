require("dotenv").config();

let adasmentors = {
  welcome_message: `Welcome to the Ada’s Mentors workspace!

  The goal of Ada’s Mentors is to mentor underprivileged students lacking the confidence and exposure to university and the application process.`,
  rules: ``
}

let adasteam = {
  welcome_message: `Hi <@${event.user}>, welcome to Ada’s Team!
  The Ada's Team workspace is for the executives to collaborate, ask questions, and fulfill Ada's Team initiatives. Although everyone has their VP roles to complete, the Ada's Team executive committee is meant to be a safe space; if you are struggling with your work, please ask others for help!

  Congrats, and thanks for joining our team. We're so happy to have you here with us!`,
  rules: `View our constitution, under Article 4 for the official rules and duties of an Ada’s Team executive.`,
  roles: `View section 4.3 of the constitution`
}

const updateInfo = {
    "text": "Here is how you update your personal info:",
    "url": "https://www.adasteam.ca"
}

module.exports = { updateInfo }
