var request = require("request");
const WEATHER_ENDPOINT = "http://api.wunderground.com/api/" + process.env.WEATHER_API_KEY + "/conditions/q/"
function getWeatherData(latitude, longitude) {

  let response;

  // Send the HTTP request to the Messenger Platform
  request(WEATHER_ENDPOINT + latitude +","+longitude+".json", (err, res, body) => {
    if (!err) {
      let result = JSON.parse(body);
      console.log(result.current_observation.feelslike_string)
    } else {
      console.error("Error getting data");
    }
  });
}

module.exports = {getWeatherData: getWeatherData}
