const {Wit, log} = require('node-wit');


function runWit(message){
  const client = new Wit({
    accessToken: MY_TOKEN,
    logger: new log.Logger(log.DEBUG) // optional
  });
  console.log(client.message(message));
}
module.exports = {runWit: runWit}
