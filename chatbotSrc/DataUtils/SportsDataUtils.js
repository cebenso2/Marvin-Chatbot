var Authentication = require("../Utils/Authentication")
var request = require("request-promise");
var btoa = require('btoa')
var MySportsFeeds = require("mysportsfeeds-node");
var msf = new MySportsFeeds("1.0", true);

const SPORTS_TEAM = "bos";
const SPORTS_LEAGUE = "nba"
//endpoint for the news api
const SPORTS_SCHEDULE_ENDPOINT = "https://api.mysportsfeeds.com/v1.1/pull/nba/current/full_game_schedule.json";

//returns the current temperature at the give lat and long
function getTeamSchedule(team) {
  let options = {
    uri: SPORTS_SCHEDULE_ENDPOINT,
    headers: {
      'User-Agent': 'Request-Promise',
      'Authentication': 'Basic ' + btoa(process.env.SPORTS_USERNAME +":"+process.env.SPORTS_PASSWORD),
    },
    method: 'GET',
    qs: {},
    transform: function(body) {
      // console.log("response = '" + util.inspect(body, {depth: null}) + "'");
      return body;
    },
    json: true // Automatically parses the JSON string in the response
  };
  console.log(options);
  return request(options).then(
    response => {
      //let data = JSON.parse(response);
      //console.log(data);
      console.log(response);
    }
  ).catch(error => console.log(error))*/

}

module.exports = {getTeamSchedule: getTeamSchedule}
