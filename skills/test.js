module.exports = function(controller) {
  
  
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

	controller.on('user_join,bot_join', (bot, payload) => {
		console.log('=====bot/user join:\n',{payload})
	})

	controller.on('user_leave,bot_leave', (bot, payload) => {
		console.log('=====bot/user leave:\n',{payload})
	})
  // controller.hears('question me', 'ambient', (bot, message) => {
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
	controller.hears ('these violent', 'inline_query', (bot, message) => {
		// hmmm my link is borked apparently...
		// why is there no placehold.it for gifs?
		const inlineResponse = [
			{
				type: 'gif',
				id: '_violent_delights3',
				gif_url: 'https://cdn.glitch.com/cafca971-0cb5-4dcd-9c20-205a8a91fb1c%2Fgiphy-downsized.gif',
				thumb_url: 'http://www.placehold.it/200x300',
				gif_width: 400,
				gif_height: 225
				// input_message_content: {
				// 	message_text: 'This is not a photo \nhttps://www.tradingview.com/x/3lf7DpdW/'
				// }

			}
		]
		bot.answerInlineQuery(message, inlineResponse)

	})
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
