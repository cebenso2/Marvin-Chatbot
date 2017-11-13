var request = require("request");
const WEATHER_ENDPOINT = "http://api.wunderground.com/api/" + process.env.WEATHER_API_KEY + "/conditions/q/"
function getWeatherData(latitude, longitude) {

  let response;

  // Send the HTTP request to the Messenger Platform
  fetch(WEATHER_ENDPOINT + latitude +","+longitude+".json",{method: 'GET',}).then(
    (response) => response.json()).then(
      (json) => {
        console.log(json.body.current_observation.feelslike_string)
        console.log(json.current_observation.feelslike_string)
      }
    ).catch(error => console.log(error));
}

module.exports = {getWeatherData: getWeatherData}
