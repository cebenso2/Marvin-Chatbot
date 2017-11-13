var request = require("request-promise");

const WEATHER_ENDPOINT = "http://api.wunderground.com/api/" + process.env.WEATHER_API_KEY + "/conditions/q/"

function getWeatherData(latitude, longitude) {
  return request(WEATHER_ENDPOINT + latitude +","+longitude+".json").then(
    response => {
      let data = JSON.parse(response);
      return data.current_observation.feelslike_string;
    }
  ).catch(error => console.log(error))
}

module.exports = {getWeatherData: getWeatherData}
