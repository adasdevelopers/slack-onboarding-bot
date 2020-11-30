require("dotenv").config();
const callTraining = require("./callingTraining");

describe('Training Test', () => {
	it('should send proper message when callResources is called', async () => {
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
					"blocks": [
                        {
                            "type": "divider"
                        },
                        {
                            "type": "section",
                            "text": {
                                "type": "mrkdwn",
                                "text": "Please complete the following instructions and when completed check the correct boxes!"
                            },
                            "accessory": {
                                "type": "checkboxes",
                                "options": [
                                    {
                                        "text": {
                                            "type": "mrkdwn",
                                            "text": "*Update Your Profile!*"
                                        },
                                        "description": {
                                            "type": "mrkdwn",
                                            "text": "Edit your profile to include a photo of yourself, your name, pronouns, and field."
                                        },
                                        "value": "value-0"
                                    },
                                    {
                                        "text": {
                                            "type": "mrkdwn",
                                            "text": "*Introduce Yourself!*"
                                        },
                                        "description": {
                                            "type": "mrkdwn",
                                            "text": "Please introduce yourself in the #introductions channel, and your relationship with Ada’s Team."
                                        },
                                        "value": "value-1"
                                    }
                                ],
                                "action_id": "training-checkboxes-action"
                            }
                        }
                    
                    ]
			};
			await callTraining(app, ackSpy, body);

			await expect(ackSpy).toBeCalled();
			await expect(app.client.chat.postEphemeral).toBeCalledWith(msg);
			
	});

});