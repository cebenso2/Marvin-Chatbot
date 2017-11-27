var request = require("request-promise");

//endpoint for the wunderground api that deals with conditions and lat,long parameters
const WEATHER_ENDPOINT = "http://api.wunderground.com/api/" + process.env.WEATHER_API_KEY + "/conditions/q/"
const FORCAST_ENDPOINT = "http://api.wunderground.com/api/" + process.env.WEATHER_API_KEY + "/forecast/q/"
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
//returns recommendations for weather info
function getForecastRecommendations(latitude, longitude) {
  return request(FORCAST_ENDPOINT+ latitude +","+longitude+".json").then(
    response => {
      let data = JSON.parse(response);
      if (data && data.forecast){
        let rain = false;
        let cold = false;
        let snow = false;
        let windy = false;
        console.log("break")
        console.log(data.forecast);
        //console.log(data.forecast.txt_forecast);
        console.log("break")
        console.log(data.forecast.simpleforecast);
        console.log("break");
        console.log(data.forecast.simpleforecast.forecastday);


        //return data.current_observation.feelslike_string;
      }
      console.log("fail");
      return "FAIL";
    }
  ).catch(error => console.log(error))
}

module.exports = {getWeatherData: getWeatherData, getForecastRecommendations: getForecastRecommendations}
