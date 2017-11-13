var request = require("request-promise");
const WEATHER_ENDPOINT = "http://api.wunderground.com/api/" + process.env.WEATHER_API_KEY + "/conditions/q/"
function getWeatherData(latitude, longitude) {

  let response;

  // Send the HTTP request to the Messenger Platform
  request(WEATHER_ENDPOINT + latitude +","+longitude+".json").then(
    response => {
      let data = JSON.parse(response);
      //console.log(response.body.current_observation.feelslike_string);
      console.log(data.current_observation.feelslike_string);
    }
  ).catch(error => console.log(error))
}

module.exports = {getWeatherData: getWeatherData}
