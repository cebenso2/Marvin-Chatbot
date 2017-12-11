var express = require("express");
var bodyParser = require("body-parser");
var MessageHandling = require("./chatbotSrc/MessageHandling")
var RetreiveToken = require("./chatbotSrc/Email/RetreiveToken")
var EmailUtils = require("./chatbotSrc/Email/EmailUtils")
var DatabaseUtils = require("./chatbotSrc/StorageUtils/DatabaseUtils")


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
var request = require("request");

//Homepage for info about marvin - render on get
app.get("/", function (req, res) {
  if(req.query.code){
    RetreiveToken.getAuthorizationToken(req.query.code, (err, token) => {
      EmailUtils.getEmail(token, (err,email) =>{
        console.log("resulting email address:");
        console.log(email);
        DatabaseUtils.getUserPsid(email, (sender_psid) =>{
          console.log("sender");
          console.log(sender_psid);
          if (sender_psid){
            DatabaseUtils.insertEmail(sender_psid, email, token);
          }
        })
      });
    });
  }
  res.render('pages/index');
});

//page for users to interact with a todo list
app.get("/todo", function (req, res) {
   res.render('pages/todo');
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

//endpoint to create persistent menu and startupbutton
app.get('/setup',function(req,res){
  console.log("setup");
  createGetStartedButton(res);
  createPersistentMenu(res);
});

//create startup button
function createGetStartedButton(res){
  var messageData = {
    "get_started":
      {
        "payload":"Get Started"
      }
  };
  request({
    url: 'https://graph.facebook.com/v2.6/me/messenger_profile?access_token='+ process.env.PAGE_ACCESS_TOKEN,
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    form: messageData
  },
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // Print out the response body
      res.send(body);
    } else {
      res.send(body);
    }
  });
}

//create persistent menu
function createPersistentMenu(res){
  let messageData = {
    "persistent_menu":[{
      "locale":"default",
      "call_to_actions":[
        {
          "type":"postback",
          "title":"News",
          "payload":"NEWS"
        },
        {
          "title":"Weather Help",
          "type":"nested",
          "call_to_actions":[
            {
              "title":"Weather Recommendations",
              "type":"postback",
              "payload":"WEATHER"
            },
            {
              "title":"Current Temperature",
              "type":"postback",
              "payload":"TEMPERATURE"
            }
          ]
        },
        {
          "title":"Other Functions",
          "type":"nested",
          "call_to_actions":[
            {
              "title":"Locations",
              "type":"postback",
              "payload":"LOCATIONS"
            },
            {
              "title":"Google",
              "type":"postback",
              "payload":"GOOGLE"
            },
            {
              "title":"Help",
              "type":"postback",
              "payload":"HELP"
            }
          ]
        },
      ]
    }]
  };
  request({
    url: 'https://graph.facebook.com/v2.6/me/messenger_profile?access_token='+ process.env.PAGE_ACCESS_TOKEN,
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    form: messageData
  },
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // Print out the response body
      res.send(body);
    } else {
      res.send(body);
    }
  });
}

// endpoint for receiving messages
app.post('/webhook', (req, res) => {

  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === 'page') {

    body.entry.forEach(function(entry) {
      let webhook_event = entry.messaging[0];

      let sender_psid = webhook_event.sender.id;
      // Check if the event is a message or postback
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

console.log("API Server Started: Running");
