module.exports = function(controller) {
  
  
	controller.on('interactive_message_callback', (bot, payload) => {
		console.log('INT MESSAGE PAYLOAD:\n', payload)
		bot.reply(payload, 'You selected: ' + payload.text)
	})

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
  // controller.hears('(.*)', 'ambient', (bot, message) => {
  // // console.log('HEARD YOU\n',message)
	  // bot.reply(message, 'I LIVE!')
	  // bot.startConversation(message, (err, convo) => {
		  // convo.ask('Can we eat?', (res, convo) => {
			  // if (res.text == 'no') {
				  // convo.say('Aww man')
			  // } else {
				  // convo.say('Yayy!')
			  // }
			  // convo.next()
		  // })
		  // convo.next()
	  // })
// })
	controller.hears('(.*)', 'inline_query', (bot, message) => {
		console.log('HEARD INLINE QUERY:\n', message)
		const inlineResponse = [
			{
				type: 'photo',
				id: 'photo1',
				photo_url: 'http://www.placehold.it/500',
				thumb_url: 'http://www.placehold.it/200x300'

			},
			{
				type: 'photo',
				id: 'photo2',
				photo_url: 'http://www.placehold.it/600',
				thumb_url: 'http://www.placehold.it/200x300',
				input_message_content: {
					message_text: 'This is not a photo \nhttps://www.tradingview.com/x/3lf7DpdW/'
				}

			},
		]
		bot.answerInlineQuery(message, inlineResponse)
	})
	controller.on('inline_query', (bot, payload) => {
		console.log('INCOMING INLINE Q:\n',payload.text)
	})

	controller.hears('(.*)', 'mention,ambient,direct_mention,direct_message,group_message,channel_message', (bot, message) => {
		console.log('MESSAGE HEARD:\n', message.message)
		bot.reply(message, message.type)
		bot.reply(message, {text: `*${message.text}*`, parse_mode: 'markdown'})
})

controller.on('photo', (bot, message) => {
	console.log('PHOTO EVENT:\n', message.photo)
	bot.reply(message, 'Lovely image')
})

controller.on('video', (bot, message) => {
	console.log('Video EVENT:\n', message)
	bot.reply(message, 'Lovely video')
})



}
