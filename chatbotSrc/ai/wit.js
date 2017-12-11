const {Wit, log} = require('node-wit');

const MESSAGE_TYPE_ENUM = {
  WEATHER: "weather",
  TEMPERATURE: "temperature",
}

function processWithAI(message){
  const client = new Wit({
    accessToken: process.env.WIT_KEY,

  });
  return client.message(message).then((data) => {
    let text = "Sorry but I do not know what that means."
    if(data && data.entities && data.entities.intent){
      for(let i of data.entities.intent){
        if (i.confidence >0.5){
          return i.value;
        }
      }
    }
    return null;
  });
}
module.exports = {processWithAI: processWithAI, MESSAGE_TYPE_ENUM: MESSAGE_TYPE_ENUM}
