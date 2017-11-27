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
  /*let options = {
    uri: SPORTS_SCHEDULE_ENDPOINT,
    headers: {
      'User-Agent': 'Request-Promise',
      'Authentication': 'Basic ' + btoa(process.env.SPORTS_USERNAME +":"+process.env.SPORTS_PASSWORD),
    },
    json: true // Automatically parses the JSON string in the response
  };
  console.log(options);
  return request(options).then(
    response => {
      let data = JSON.parse(response);
      console.log(data);
      return data;
    }
  ).catch(error => console.log(error))*/

  let msf = new MySportsFeeds("1.0", true, null);
  msf.authenticate(process.env.SPORTS_USERNAME, process.env.SPORTS_PASSWORD);
  let data = msf.getData('nba', '2016-2017-regular', 'player_gamelogs', 'json', {player: 'stephen-curry'});
  console.log(data);
}

module.exports = {getTeamSchedule: getTeamSchedule}
