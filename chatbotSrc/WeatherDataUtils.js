var request = require("request-promise");
const WEATHER_ENDPOINT = "http://api.wunderground.com/api/" + process.env.WEATHER_API_KEY + "/conditions/q/"
function getWeatherData(latitude, longitude) {

  let response;

  // Send the HTTP request to the Messenger Platform
  request(WEATHER_ENDPOINT + latitude +","+longitude+".json").then(
    response => {
      console.log(repsonse.body.current_observation.feelslike_string);
      console.log(response.current_observation.feelslike_string);
    }
  ).catch(error => console.log(error))
}

module.exports = {getWeatherData: getWeatherData}
