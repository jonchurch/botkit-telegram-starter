var debug = require('debug')('botkit:incoming_webhooks');

const telegramWebhook = '/telegram/receive'

module.exports = function(webserver, controller) {

    debug('Configured POST /facebook/receive url for receiving events');
    webserver.post(telegramWebhook, function(req, res) {

        // NOTE: we should enforce the token check here

        var bot = controller.spawn({});

        // Now, pass the webhook into be processed
        controller.handleWebhookPayload(req, res, bot);

    });

}
