const {Wit, log} = require('node-wit');


function runWit(message){
  const client = new Wit({
    accessToken: process.env.WIT_KEY,

  });
  return client.message(message).then((data) =>{
    return data;
  });
}
module.exports = {runWit: runWit}
