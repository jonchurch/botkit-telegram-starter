module.exports = (controller) => {

	// Interactive message postbacks 
	// (this could be a middleware eventually?)
	
	// Send inline keyboard to user
	controller.hears('int', 'direct_message,group_message,direct_mention', (bot, message) => {
		console.log({message})
		bot.reply(message, {
			text: 'This is an inline keyboard',
			reply_markup: {
				inline_keyboard: [[
					{
						text: 'Yes',
						callback_data: 'yes'
					},
					{
						text: 'No',
						callback_data: 'no'
					},
				]]
			}
		})
	})

	controller.on('interactive_message_callback', (bot, payload) => {
		// console.log('INT MESSAGE PAYLOAD:\n', payload)
		bot.answerCallbackQuery(payload, {text: null, show_alert: false, url: "t.me/kuaytiewbot?start=pizza"}, (err, res) => {
			if (err) {
				console.log('API ERROR:\n', err)
			} else {
				console.log("API RES:\n", res)
			}
		})
		bot.reply(payload, 'You selected: ' + payload.text)
	})
}
