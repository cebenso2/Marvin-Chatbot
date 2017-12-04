var distance = require('google-distance-matrix');

//use google maps api and google maps npm wrapper to get time estimate
function getTimeFromOriginToDest(olat, olong, dlat, dlong, mode, callback) {
  var origins = [olat +","+olong];
  var destinations = [dlat +","+dlong];
  distance.key(process.env.MAPS_API_KEY);
  distance.mode(mode);
  distance.matrix(origins, destinations, callback);
}

module.exports = {getTimeFromOriginToDest: getTimeFromOriginToDest}
