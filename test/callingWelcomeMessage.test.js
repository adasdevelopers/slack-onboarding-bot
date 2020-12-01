const callWelcomeMessage  = require('../src/callingWelcomeMessage');
require("dotenv").config();
describe('Welcome Message Test', () => {
	it('should send proper message when callWelcomeMessage is called', async () => {
			const clientSpy = jest.fn();
            const postMessageSpy = jest.fn();
            const contextSpy = jest.fn();
			const app = {
				client: {
					chat: {
						postMessage: postMessageSpy 
					}
				}
			}
			
			const event = {
				user: 'John-Doe',
                channel : Math.random()
			}
			const msg = {
                token: process.env.SLACK_BOT_TOKEN,
                channel: event.channel,
                user: event.user,
                text: `Hi <@${event.user}>, welcome to Ada’s Team! The Ada's Team workspace is for the executives to collaborate, ask questions, and fulfill Ada's Team initiatives. Although everyone has their VP roles to complete, the Ada's Team executive committee is meant to be a safe space; if you are struggling with your work, please ask others for help! Congrats, and thanks for joining our team. We're so happy to have you here with us!`
			};
			await callWelcomeMessage(event, clientSpy, contextSpy, app);
			await expect(app.client.chat.postMessage).toBeCalledWith(msg);
			
	});

});