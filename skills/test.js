module.exports = function(controller) {
  
  
  controller.hears('(.*)', 'message_received,direct_message,ambient', (bot, message) => {
  console.log('HEARD YOU')
})
}