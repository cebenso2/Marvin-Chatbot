const { spawn } = require('child_process');
const request = require('request');
const test = require('tape');

// Start the app
const env = Object.assign({}, process.env, {PORT: 5000});
const child = spawn('node', ['serverAPI.js'], {env});

test('responds to requests', (t) => {
  /*t.plan(4);

  // Wait until the server is ready
  child.stdout.on('data', _ => {
    // Make a request to our app
    request('http://127.0.0.1:5000', (error, response, body) => {
      // stop the server
      child.kill();

      // No error
      t.false(error);
      // Successful response
      t.equal(response.statusCode, 200);
      // Assert content checks
      t.notEqual(body.indexOf("<title>Node.js Getting Started on Heroku</title>"), -1);
      t.notEqual(body.indexOf("Getting Started with Node on Heroku"), -1);
    });*/
  let thing  =
  {
    "response": {
      "version":"0.1",
      "termsofService":"http://www.wunderground.com/weather/api/d/terms.html",
      "features": {
        "conditions": 1
      }
    },
    "current_observation": {
      "image": {
        "url":"http://icons.wxug.com/graphics/wu2/logo_130x80.png",
        "title":"Weather Underground",
        "link":"http://www.wunderground.com"
		},
    "display_location": {
      "full":"San Francisco, CA",
      "city":"San Francisco",
      "state":"CA",
  		"state_name":"California",
  		"country":"US",
  		"country_iso3166":"US",
  		"zip":"94158",
  		"magic":"1",
  		"wmo":"99999",
  		"latitude":"37.770000",
  		"longitude":"-122.390000",
  		"elevation":"18.9"
    },
    "observation_location": {
      "full":"Mission Creek, San Francisco, California",
  		"city":"Mission Creek, San Francisco",
  		"state":"California",
  		"country":"US",
  		"country_iso3166":"US",
  		"latitude":"37.772312",
  		"longitude":"-122.395493",
  		"elevation":"3 ft"
    },
    "estimated": {},
		"station_id":"KCASANFR1104",
		"observation_time":"Last Updated on November 12, 7:55 PM PST",
		"observation_time_rfc822":"Sun, 12 Nov 2017 19:55:46 -0800",
		"observation_epoch":"1510545346",
		"local_time_rfc822":"Sun, 12 Nov 2017 20:06:28 -0800",
		"local_epoch":"1510545988",
		"local_tz_short":"PST",
		"local_tz_long":"America/Los_Angeles",
		"local_tz_offset":"-0800",
		"weather":"Clear",
		"temperature_string":"57.1 F (13.9 C)",
		"temp_f":57.1,
		"temp_c":13.9,
		"relative_humidity":"84%",
		"wind_string":"Calm",
		"wind_dir":"NE",
		"wind_degrees":34,
		"wind_mph":0.0,
		"wind_gust_mph":"1.0",
		"wind_kph":0,
		"wind_gust_kph":"1.6",
		"pressure_mb":"1020",
		"pressure_in":"30.13",
		"pressure_trend":"0",
		"dewpoint_string":"52 F (11 C)",
		"dewpoint_f":52,
		"dewpoint_c":11,
		"heat_index_string":"NA",
		"heat_index_f":"NA",
		"heat_index_c":"NA",
		"windchill_string":"NA",
		"windchill_f":"NA",
		"windchill_c":"NA",
		"feelslike_string":"57.1 F (13.9 C)",
		"feelslike_f":"57.1",
		"feelslike_c":"13.9",
		"visibility_mi":"10.0",
		"visibility_km":"16.1",
		"solarradiation":"--",
		"UV":"0","precip_1hr_string":"0.00 in ( 0 mm)",
		"precip_1hr_in":"0.00",
		"precip_1hr_metric":" 0",
		"precip_today_string":"0.00 in (0 mm)",
		"precip_today_in":"0.00",
		"precip_today_metric":"0",
		"icon":"clear",
		"icon_url":"http://icons.wxug.com/i/c/k/nt_clear.gif",
		"forecast_url":"http://www.wunderground.com/US/CA/San_Francisco.html",
		"history_url":"http://www.wunderground.com/weatherstation/WXDailyHistory.asp?ID=KCASANFR1104",
		"ob_url":"http://www.wunderground.com/cgi-bin/findweather/getForecast?query=37.772312,-122.395493",
		"nowcast":""
  }
}
  console.log(thing.current_observation.feelslike_string)
});
