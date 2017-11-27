import Base64 from './Base64'

//Module for setting up authetication header for post requests
module.exports = {
  getAuthenticationHeader(){
    return 'Basic '+  Base64.btoa(process.env.SPORTS_USERNAME + ':' + process.env.SPORTS_PASSWORD)
  },
}
