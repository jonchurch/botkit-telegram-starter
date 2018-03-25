var request = require('request');
var debug = require('debug')('botkit:subscribe_events');

module.exports = function(controller) {

    debug('Subscribing to Telegram events...');
  request.post('https://api.telegram.org/bot' + controller.config.access_token + '/setWebhook', {
                form: {                                                        
                    url: controller.config.webhook_url + 'telegram/receive'        
                }                                                              
            },                                                                 
            function(err, res, body) {                                         
                if (err) {                                                     
                    debug('Could not set webhook with Telegram');
                } else {  
                  if (body.ok === 'false') {
                    console.log('Could not setup Telegram Webhook', body)
                  } else {
                    debug('Successfully setup Telegram webhook', body);     
                    controller.startTicking();    
                  }
                }   
            }); 
};
