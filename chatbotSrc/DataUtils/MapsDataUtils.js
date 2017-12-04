var request = require("request-promise");
let endpoint = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=Vancouver+BC|Seattle&destinations=San+Francisco|Victoria+BC&key=AIzaSyAYtdgKqjDivyTKd2CcHbN8h7P2TwWbotk"

function getTimeFromOriginToDest() {
  var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyAYtdgKqjDivyTKd2CcHbN8h7P2TwWbotk',
  });
  googleMapsClient.distanceMatrix({
    origins: ['Greenwich, England'],
    destinations: ['Stockholm, Sweden'],
    travelMode: 'DRIVING',
  }, callback);

  function callback(response, status) {
    console.log(response);
  }
}

module.exports = {getTimeFromOriginToDest: getTimeFromOriginToDest}
