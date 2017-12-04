var request = require("request-promise");
var distance = require('google-distance-matrix');
const endpoint = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=Vancouver+BC|Seattle&destinations=San+Francisco|Victoria+BC&key=AIzaSyAYtdgKqjDivyTKd2CcHbN8h7P2TwWbotk"

function getTimeFromOriginToDest() {
  var origins = ['San Francisco CA'];
  var destinations = ['New York NY', '41.8337329,-87.7321554'];
  distance.key('AIzaSyAYtdgKqjDivyTKd2CcHbN8h7P2TwWbotk');
  distance.matrix(origins, destinations, function (err, distances) {
    if (!err){
      console.log(distances);
    }
  });
}

module.exports = {getTimeFromOriginToDest: getTimeFromOriginToDest}
