var request = require("request-promise");
var Authentication = require("../Utils/Authentication")

//news source - currently only CNN
const SPORTS_TEAM = "bos";
const SPORTS_LEAGUE = "nba"
//endpoint for the news api
const SPORTS_SCHEDULE_ENDPOINT = "https://api.mysportsfeeds.com/v1.1/pull/nba/current/full_game_schedule.json";

//returns the current temperature at the give lat and long
function getTeamSchedule(team) {
  return request(SPORTS_SCHEDULE_ENDPOINT, {
    method: 'GET',
    headers: {
      'Authentication': Authentication.getAuthenticationHeader(),
    },
  }).then(
    response => {
      let data = JSON.parse(response);
      console.log(data);
      return data;
    }
  ).catch(error => console.log(error))
}

module.exports = {getTeamSchedule: getTeamSchedule}
