const { spawn } = require('child_process');
const request = require('request');
const test = require('tape');
const WeatherDataUtils = require("./chatbotSrc/DataUtils/WeatherDataUtils")
const NewsDataUtils = require("./chatbotSrc/DataUtils/NewsDataUtils")


// Start the app
const env = Object.assign({}, process.env, {PORT: 5000, PAGE_ACCESS_TOKEN: "Test", VERIFY_TOKEN: "test", WEATHER_API_KEY: "test"});
const child = spawn('node', ['serverAPI.js'], {env});

//test api endpoints
test('basic api endpoints', (t) => {
  t.plan(11);
  let first = true
  // Wait until the server is ready
  child.stdout.on('data', _ => {
    if (first) {
      first = false;
      // Make a request to our app
      request('http://127.0.0.1:5000', (error, response, body) => {
        // stop the server
        // No error
        t.false(error);
        // Successful response
        t.equal(response.statusCode, 200);
        // Assert content checks
        t.notEqual(body.indexOf("<title>Marvin</title>"), -1);
        t.notEqual(body.indexOf("< Greeting >"), -1);
      });
      request('http://127.0.0.1:5000/webhook?hub.verify_token=test&hub.challenge=CHALLENGE_ACCEPTED&hub.mode=subscribe', (error, response, body) => {
        // stop the server
        // No error
        t.false(error);
        t.equal(response.statusCode, 200);
        // Assert content checks
        t.equal(body, "CHALLENGE_ACCEPTED");
      });
      request('http://127.0.0.1:5000/todo', (error, response, body) => {
        // stop the server
        // No error
        t.false(error);
        t.equal(response.statusCode, 200);
        // Assert content checks
        t.notEqual(body.indexOf("TODO List"), -1);
        t.notEqual(body.indexOf("Add Item TODO:"), -1);

      });
      setTimeout(function () { child.kill() }, 100);
    }
  });
});

//test for weather data
test('get weather data', (t) => {
  let lat = "40.7484"
  let long = "73.9857"
  t.plan(2);
  WeatherDataUtils.getTemperatureData(lat,long).then(response =>{
    t.false(false);
    t.equal(response, "FAIL")
  });
});

//test for weather recommendations
test('get weather data recommendations', (t) => {
  let rec = WeatherDataUtils.createRecommendationText(false, false, false, false, false, false, "Clear");
  t.equal(rec, "Today is going to be mild and have clear conditions. I would recommend wearing anything you want. ")
  rec = WeatherDataUtils.createRecommendationText(false, false, true, false, false, false, "Clear");
  t.equal(rec, 'Today is going to be mild and have clear conditions. Most likely it is going to rain. I would recommend wearing a rain jacket. ')
  t.end();
});

//test for headlines
test('get news headlines', (t) => {
  NewsDataUtils.getNewsHeadlines().then( response => {
    t.false(response);
    t.end();
  });
});
