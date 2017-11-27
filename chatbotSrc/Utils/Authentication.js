var Base64 = require('./Base64');

//Module for setting up authetication header for post requests
module.exports = {
  getAuthenticationHeader(){
    console.log(process.env.SPORTS_USERNAME);
    console.log(process.env.SPORTS_PASSWORD);
    return 'Basic '+  Base64.btoa(process.env.SPORTS_USERNAME + ':' + process.env.SPORTS_PASSWORD)
  },
}
