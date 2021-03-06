const {Wit, log} = require('node-wit');

//enum for different ai responses
const MESSAGE_TYPE_ENUM = {
  WEATHER: "weather",
  TEMPERATURE: "temperature",
  TIP: "tip",
  NEWS: "news",
}

//process the given ai with wit ai and uses it to determine response
function processWithAI(message){
  const client = new Wit({
    accessToken: process.env.WIT_KEY,

  });
  return client.message(message).then((data) => {
    if(data && data.entities && data.entities.intent){
      for(let i of data.entities.intent){
        if (i.confidence >0.5){
          if(i.value === "tip"){
            return {
              type: i.value,
              number: data.entities.number[0].value,
            }
          } else {
            return {
              type: i.value
            }

          }
        }
      }
    }
    return {
      type:null,
    }
  });
}
module.exports = {processWithAI: processWithAI, MESSAGE_TYPE_ENUM: MESSAGE_TYPE_ENUM}
