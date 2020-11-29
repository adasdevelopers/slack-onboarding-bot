const { callFaq } = require('./callingFaq');
require("dotenv").config();

describe('FAQ Test', () => {
	it('should send proper message when callFaq is called', async () => {
			const ackSpy = jest.fn();
			const postEphemeralSpy = jest.fn();
			const app = {
				client: {
					chat: {
						postEphemeral: postEphemeralSpy
					}
				}
			}
			const body = {
				channel_id: Math.random(),
				user_id: Math.random()
			}
			const msg = {
					token: process.env.SLACK_BOT_TOKEN,
					channel: body.channel_id,
        	user: body.user_id,
					text: "Read our FAQ here https://www.adasteam.ca/faq"
			};
			await callFaq(app, ackSpy, body);

			await expect(ackSpy).toBeCalled();
			await expect(app.client.chat.postEphemeral).toBeCalledWith(msg);
			
	});

});