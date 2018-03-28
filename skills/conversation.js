
module.exports = (controller) => {

	// Okay so apparently images count in conversations... I think that's how slack does it too?
  controller.hears(['question me', 'q'], 'ambient,direct_message', (bot, message) => {
	  bot.reply(message, 'I LIVE!')
	  bot.startConversation(message, (err, convo) => {
		  convo.ask('Can we eat?', (res, convo) => {
			  console.log({res})
			  if (res.text.toLowerCase() == 'no') {
				  convo.say('Aww man')
			  } else {
				  convo.say('Yayy!')
			  }
			  convo.next()
		  })
		  convo.next()
	  })
})

}
