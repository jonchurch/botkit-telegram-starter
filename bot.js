/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
           ______     ______     ______   __  __     __     ______
          /\  == \   /\  __ \   /\__  _\ /\ \/ /    /\ \   /\__  _\
          \ \  __<   \ \ \/\ \  \/_/\ \/ \ \  _"-.  \ \ \  \/_/\ \/
           \ \_____\  \ \_____\    \ \_\  \ \_\ \_\  \ \_\    \ \_\
            \/_____/   \/_____/     \/_/   \/_/\/_/   \/_/     \/_/


This is a sample Facebook bot built with Botkit.

# RUN THE BOT:
  Follow the instructions here to set up your Facebook app and page:
    -> https://developers.facebook.com/docs/messenger-platform/implementation
  Run your bot from the command line:
    page_token=<MY PAGE TOKEN> verify_token=<MY_VERIFY_TOKEN> node bot.js



~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var env = require('node-env-file');
env(__dirname + '/.env');


var Botkit = require('../../Forks/botkit')//require('botkit');
var debug = require('debug')('botkit:main');
var rp = require('request-promise')

rp({
	method: 'GET',
	json: true,
	headers: {
		'content-type': 'application/json',
	},
	uri: 'https://api.telegram.org/bot' + process.env.access_token + '/getMe'
})
.then(body => {

// Create the Botkit controller, which controls all instances of the bot.
var controller = Botkit.telegrambot({
    // debug: true,
    webhook_url: process.env.webhook_url,
    // verify_token: process.env.verify_token,
    access_token: process.env.access_token,
    studio_token: process.env.studio_token,
    studio_command_uri: process.env.studio_command_uri,
	identity: body.result
});

// Set up an Express-powered webserver to expose oauth and webhook endpoints
var webserver = require(__dirname + '/components/express_webserver.js')(controller);

// Tell Facebook to start sending events to this application
require(__dirname + '/components/subscribe_events.js')(controller);

var normalizedPath = require("path").join(__dirname, "skills");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  require("./skills/" + file)(controller);
});


// This captures and evaluates any message sent to the bot as a DM
// or sent to the bot in the form "@bot message" and passes it to
// Botkit Studio to evaluate for trigger words and patterns.
// If a trigger is matched, the conversation will automatically fire!
// You can tie into the execution of the script using the functions
// controller.studio.before, controller.studio.after and controller.studio.validate
if (process.env.studio_token) {
    controller.on('message_received,facebook_postback', function(bot, message) {
        if (message.text) {
            controller.studio.runTrigger(bot, message.text, message.user, message.channel, message).then(function(convo) {
                if (!convo) {
                    // no trigger was matched
                    // If you want your bot to respond to every message,
                    // define a 'fallback' script in Botkit Studio
                    // and uncomment the line below.
                    controller.studio.run(bot, 'fallback', message.user, message.channel, message);
                } else {
                    // set variables here that are needed for EVERY script
                    // use controller.studio.before('script') to set variables specific to a script
                    convo.setVar('current_time', new Date());
                }
            }).catch(function(err) {
                if (err) {
                    bot.reply(message, 'I experienced an error with a request to Botkit Studio: ' + err);
                    debug('Botkit Studio: ', err);
                }
            });
        }
    });
} else {
    console.log('~~~~~~~~~~');
    console.log('NOTE: Botkit Studio functionality has not been enabled');
    console.log('To enable, pass in a studio_token parameter with a token from https://studio.botkit.ai/');
}

function usage_tip() {
    console.log('~~~~~~~~~~');
    console.log('Botkit Studio Starter Kit');
    console.log('Execute your bot application like this:');
    console.log('page_token=<MY PAGE TOKEN> verify_token=<MY VERIFY TOKEN> studio_token=<MY BOTKIT STUDIO TOKEN> node bot.js');
    console.log('Get Facebook token here: https://developers.facebook.com/docs/messenger-platform/implementation')
    console.log('Get a Botkit Studio token here: https://studio.botkit.ai/')
    console.log('~~~~~~~~~~');

}
})
.catch(err => {
	console.log('Something went wrong with bots ID: ', err)
})
