var request = require("request-promise");

//endpoint for the wunderground api that deals with conditions and lat,long parameters
const WEATHER_ENDPOINT = "http://api.wunderground.com/api/" + process.env.WEATHER_API_KEY + "/conditions/q/"

//returns the current temperature at the give lat and long
function getWeatherData(latitude, longitude) {
  return request(WEATHER_ENDPOINT + latitude +","+longitude+".json").then(
    response => {
      let data = JSON.parse(response);
      if (data && data.current_observation){
        return data.current_observation.feelslike_string;
      }
      return "FAIL";
    }
  ).catch(error => console.log(error))
}

module.exports = {getWeatherData: getWeatherData}
