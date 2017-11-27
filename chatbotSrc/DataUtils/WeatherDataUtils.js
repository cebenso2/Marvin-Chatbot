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
        let forecast = data.forecast.simpleforecast.forecastday[0];
        let lowTemp = forecast.low.fahrenheit;
        let highTemp = forecast.high.fahrenheit
        let precipitation = forecast.qpf_allday.in > 0;
        let cold = lowTemp < 40;
        let hot = highTemp > 80;
        let snow = forecast.snow_allday.in > 0;
        let windy = forecast.avewind.mph > 17;
        let humid = forecast.avehumid > 100;

        let tempText = "mild" ;
        if hot {
          tempText="hot";
        }
        if cold {
          tempText="cold";
        }
        let conditions = forecast.conditions;

        let overView = "Today is going to be " + tempText +" in terms of temperature and have " + conditions + ' conditions. '

        let events = [];
        if (snow) {
          events.push("snow");
        }
        if (rain) {
          events.push("rain");
        }
        if (wind) {
          events.push("be windy");
        }
        if (humid) {
          events.push("be humid");
        }
        let eventsText = ""
        if(len(events)==0){
          eventsText = "nice outside"
        }
        else if (len(events)<2){
          eventsText = events[0];
        } else if (len(events)==2){
          eventsText = events[0] + " and " +events[1];
        } else {
          for (let i = 0; i < events.length - 1; i++) {
            eventsText += events[i]+", ";
          }
          eventsText += "and " events[events.length-1];
        }

        let weatherEvents = "During today, it is probably going to " + eventsText;

        let clothing = "";
        if (hot && precipitation){
          clothing = "shorts and bring an umbrella";
        } else if (hot){
          clothing ="shorts";
        } else if (mild && windy){
          clothing = "a wind breaker";
        } else if(snow || cold){
          clothing = "a winter jacket"
        } else if (precipitation){
          clothing = "rain jacket"
        } else {
          clothing = "anything you want"
        }

        let clothingRecommendation = "I would recommend wearing " + clothing;
        let recommendations = overView + weatherEvents + clothingRecommendation;
        console.log(recommendations);
        return;
      }
      return "FAIL";
    }
  ).catch(error => console.log(error))
}

module.exports = {getWeatherData: getWeatherData, getForecastRecommendations: getForecastRecommendations}
