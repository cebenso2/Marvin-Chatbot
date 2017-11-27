var Authentication = require("../Utils/Authentication")
var request = require("request-promise");

//news source - currently only CNN
const SPORTS_TEAM = "bos";
const SPORTS_LEAGUE = "nba"
//endpoint for the news api
const SPORTS_SCHEDULE_ENDPOINT = "https://api.mysportsfeeds.com/v1.1/pull/nba/current/full_game_schedule.json";

//returns the current temperature at the give lat and long
function getTeamSchedule(team) {
  let options = {
    uri: SPORTS_SCHEDULE_ENDPOINT,
    headers: {
      'Authentication': Authentication.getAuthenticationHeader(),
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
  ).catch(error => console.log(error))
}

module.exports = {getTeamSchedule: getTeamSchedule}
