
module.exports = (controller) => {
	// Inline callbacks, handling inline mode

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
}
