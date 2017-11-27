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
      if (data && data.forecast && data.forecast.simpleforecast &&data.forecast.simpleforecast.forecastday){
        let forcast = data.forecast.simpleforecast.forecastday[0];
        let lowTemp = forecast.low.fahrenheit;
        let highTemp = forecast.high.fahrenheit
        let precipitation = forecast.qpf_allday.in > 0;
        let cold = lowTemp < 40;
        let hot = highTemp > 80;
        let snow = forecast.snow_allday.in > 0;
        let windy = forecast.avewind.mph > 17;
        let humid = forecast.avehumid > 100;

        console.log(lowTemp);
        console.log(highTemp);
        console.log(cold);
        console.log(hot);
        console.log(precipitation);
        console.log(snow);
        console.log(windy);
        console.log(humid);



        //return data.current_observation.feelslike_string;
      }
      console.log("fail");
      return "FAIL";
    }
  ).catch(error => console.log(error))
}

module.exports = {getWeatherData: getWeatherData, getForecastRecommendations: getForecastRecommendations}
