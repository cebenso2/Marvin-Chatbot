var request = require("request");
var WeatherDataUtils = require("./WeatherDataUtils")
var NewsDataUtils = require("./NewsDataUtils")


//access token for page - set in heroku for security
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
//endpoint to send response messages to
const FACEBOOK_ENDPOINT = "https://graph.facebook.com/v2.6/me/messages"

//receives a message and a sender id. Deteremines the correct response
function handleMessage(sender_psid, received_message) {
  let response;
  // Check if the message contains text
  if (received_message.text) {
    let greeting = firstEntity(received_message.nlp, 'greetings');
    // Create the payload for a basic text message
    if (received_message.text === "@help") {
      response = {
        "text": "I am a personal assistant chatbot. Learn how I can help you at: http://marvin-assistant.herokuapp.com/"
      }
    } else if (received_message.text === "@hi") {
      response = {
        "text": "Hi. I hope you are having a good day!"
      }
    } else if (received_message.text === "@weather") {
      response = {
        "text": "Where are you so I can get weather data?",
        "quick_replies":[
          {"content_type":"location"}
        ]
      }
    } else if (received_message.text === "@news") {
      response = getNewsHeadlinesResponse();
    } else if (greeting && greeting.confidence > 0.8) {
      response = {
        "text": "Hello! My name is Marvin and I am good.",
      }
    } else {
      // default
      response = {
        "text": `You sent the message: "${received_message.text}". I do not know how to respond. Try sending "@help".`
      }
    }
  } else if (received_message.attachments) {

    // Gets the corrdintes of the message attachment
    let coordinates = received_message.attachments[0].payload.coordinates;
    WeatherDataUtils.getWeatherData(coordinates.lat, coordinates.long).then(
      tempString => {
        if (!tempString || tempString == "FAIL"){
          response = {
            "text": "Sorry I could find any weather data for that location.",
          }
        } else {
          response = {
            "text": "The current temperature is " + tempString,
          }
        }
        sendMessage(sender_psid, response);
      }
    );
    return
  }
  // Sends the response message
  console.log(response);
  sendMessage(sender_psid, response);
}

//Handle postback - TODO
function handlePostback(sender_psid, received_message) {
}

function getNewsHeadlinesResponse(){
    let headlines = NewsDataUtils.getNewsHeadlines();
    let response = {
      "attachment":{
        "type":"template",
        "payload":{
          "template_type":"generic",
          "elements":[{
            "title":"Welcome to Peter\'s Hats",
            "image_url":"https://petersfancybrownhats.com/company_image.png",
            "subtitle":"We\'ve got the right hat for everyone.",
            "default_action": {
              "type": "web_url",
              "url": "https://peterssendreceiveapp.ngrok.io/view?item=103",
              "messenger_extensions": true,
              "webview_height_ratio": "tall",
              "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://petersfancybrownhats.com",
                "title":"View Website"
              },{
                "type":"postback",
                "title":"Start Chatting",
                "payload":"DEVELOPER_DEFINED_PAYLOAD"
              }
            ]
          }
        ]
      }
    }
  };
  console.log(response);
  return response;
}

//sends a message back to the sender id over facebook messenger
function sendMessage(sender_psid, response) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response,

  }
  // Send the HTTP request to the Messenger Platform
  request({
    "uri": FACEBOOK_ENDPOINT,
    "qs": { "access_token": PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  });
}

//NLP helper function
function firstEntity(nlp, name) {
  return nlp && nlp.entities && nlp.entities && nlp.entities[name] && nlp.entities[name][0];
}

module.exports = {handleMessage: handleMessage, handlePostback: handlePostback}
