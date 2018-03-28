
module.exports = (controller) => {

	controller.on('photo', (bot, message) => {
		console.log('PHOTO EVENT:\n', message.photo)
		bot.reply(message, 'Lovely image')
	})

	controller.on('video', (bot, message) => {
		console.log('Video EVENT:\n', message)
		bot.reply(message, 'Lovely video')
	})
}
