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
	controller.hears('(.*)', 'direct_mention,direct_message,group_message,channel_message', (bot, message) => {
		bot.reply(message, message.type)
		bot.reply(message, message.text)
})



}
