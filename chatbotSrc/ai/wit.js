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
    if(data && data.entities && data.entities.intent){
      for(let i of data.entities.intent){
        console.log(i);
        if (i.confidence >0.5){
          if(i.value === "tip"){
            console.log(i);
            return i.value
          };
        }
      }
    }
    return null;
  });
}
module.exports = {processWithAI: processWithAI, MESSAGE_TYPE_ENUM: MESSAGE_TYPE_ENUM}
