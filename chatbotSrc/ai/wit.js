const {Wit, log} = require('node-wit');


function processWithAI(message){
  const client = new Wit({
    accessToken: process.env.WIT_KEY,

  });
  return client.message(message).then((data) => {
    let text = "Sorry but I do not know what that means."
    if(data && data.entities && data.entities.intent){
      for(let i of data.entities.intent){
        console.log(i);
      }
    }
    return text;
  });
}
module.exports = {processWithAI: processWithAI}
