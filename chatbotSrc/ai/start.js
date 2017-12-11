const {Wit, log} = require('node-wit');


function runWit(message){
  const client = new Wit({
    accessToken: process.env.WIT_KEY,

  });
  client.message(message).then((data) =>{
    console.log(data);
  });
}
module.exports = {runWit: runWit}
