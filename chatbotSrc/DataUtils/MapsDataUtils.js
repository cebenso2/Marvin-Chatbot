var request = require("request-promise");
var distance = require('google-distance-matrix');
const endpoint = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=Vancouver+BC|Seattle&destinations=San+Francisco|Victoria+BC&key=AIzaSyAYtdgKqjDivyTKd2CcHbN8h7P2TwWbotk"

function getTimeFromOriginToDest(olat, olong, dlat, dlong, mode, callback) {
  var origins = [olat +","+olong];
  var destinations = [dlat +","+dlong];
  distance.key('AIzaSyAYtdgKqjDivyTKd2CcHbN8h7P2TwWbotk');
  distance.mode(mode);
  distance.matrix(origins, destinations, callback);
}

module.exports = {getTimeFromOriginToDest: getTimeFromOriginToDest}
