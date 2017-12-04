var request = require("request-promise");
let endpoint = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=Vancouver+BC|Seattle&destinations=San+Francisco|Victoria+BC&key=AIzaSyAYtdgKqjDivyTKd2CcHbN8h7P2TwWbotk"

function getTimeFromOriginToDest() {

  var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyAYtdgKqjDivyTKd2CcHbN8h7P2TwWbotk',
    Promise: Promise
  });
  let ll = new.google.maps.LatLng(12,-12);
  console.log(ll)
  googleMapsClient.
  return request(endpoint).then(
    response => {
      let data = JSON.parse(response);
      console.log(data)
    }
  ).catch(error => console.log("News Error"))
}

module.exports = {getTimeFromOriginToDest: getTimeFromOriginToDest}
