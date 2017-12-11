const {Wit, log} = require('node-wit');


function runWit(message){
  const client = new Wit({
    accessToken: "SPYAJMGQ5F6QCJBNU52ECV7XDYPJNZVU",

  });
  console.log(client.message(message));
}
module.exports = {runWit: runWit}
