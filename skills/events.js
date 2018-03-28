
module.exports = (controller) => {

	// Platform and user events

	controller.on('bot_join', (bot, payload) => {
		// console.log('=====bot join:\n',{payload})
		bot.reply(payload, 'Thank you for inviting me to your chat =]')
	})

	controller.on('bot_leave', (bot, payload) => {
		// console.log('=====bot leave:\n',{payload})
		console.log('Oh no, I have left the chat!')
	})

	controller.on('user_join', (bot, payload) => {
		// console.log('=====user join:\n',{payload})
		bot.reply(payload, `Welcome to the chat, @${payload.new_chat_member.username}!"`)
	})

	controller.on('user_leave', (bot, payload) => {
		// console.log('=====user leave:\n',{payload})
	})

	controller.on('other_bot_join', (bot, payload) => {
		bot.reply(payload, `An unkown bot has joined our chat: ${payload.new_chat_member.username}, AKA "${payload.new_chat_member.first_name}"`)
	})

	controller.on('other_bot_leave', (bot, payload) => {
		bot.reply(payload, `An unkown bot has left our chat: ${payload.new_chat_member.username}, AKA "${payload.new_chat_member.first_name}"`)
	})
}
