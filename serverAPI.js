var express = require("express");
var bodyParser = require("body-parser");
var MessageHandling = require("./chatbotSrc/MessageHandling")
//creates api endpoints for interaction with the server
//support
//get / : for info pages
//get /webhook : for verifying web
//post /webhook : for receiving post requests from facebook messages
var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen((process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

//token for verification of webhook - set in heroku for security
const VERIFY_TOKEN = process.env.VERIFY_TOKEN

//Homepage for info about marvin - render on get
app.get("/", function (req, res) {
   res.render('pages/index');
});

// Facebook Webhook
// Used for verification
app.get("/webhook", function (req, res) {
  if (req.query["hub.verify_token"] === VERIFY_TOKEN) {
    console.log("Verified webhook");
    res.status(200).send(req.query["hub.challenge"]);
  } else {
    console.error("Verification failed. The tokens do not match.");
    res.sendStatus(403);
  }
});

// endpoint for receiving messages
app.post('/webhook', (req, res) => {

  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === 'page') {

    body.entry.forEach(function(entry) {
      // Gets the body of the webhook event
      let webhook_event = entry.messaging[0];

      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        MessageHandling.handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        MessageHandling.handlePostback(sender_psid, webhook_event.postback);
      }
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});
