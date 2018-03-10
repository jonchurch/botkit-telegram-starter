module.exports = function(controller) {
  
  
  controller.hears('(.*)', '_direct_message', (bot, message) => {
  // console.log('HEARD YOU\n',message)
	  bot.reply(message, 'I LIVE!')
	  bot.startConversation(message, (err, convo) => {
		  convo.ask('Can we eat?', (res, convo) => {
			  if (res.text == 'no') {
				  convo.say('Aww man')
			  } else {
				  convo.say('Yayy!')
			  }
			  convo.next()
		  })
		  convo.next()
	  })
})
	controller.on('interactive_message_callback', (bot, payload) => {
		console.log('INT MESSAGE PAYLOAD:\n', payload)
		bot.reply(payload, 'You selected: ' + payload.text)
	})

	controller.hears('int', 'direct_message,group_message,direct_mention', (bot, message) => {
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
	controller.hears('(.*)', 'message_received,direct_mention,direct_message,group_message,channel_message', (bot, message) => {
		console.log('MESSAGE HEARD:\n', message.message)
		bot.reply(message, message.type)
		bot.reply(message, message.text)
})

controller.on('photo', (bot, message) => {
	console.log('PHOTO EVENT:\n', message)
	bot.reply(message, 'Lovely image')
})

controller.on('video', (bot, message) => {
	console.log('Video EVENT:\n', message)
	bot.reply(message, 'Lovely video')
})



}
