let endpoint = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=Vancouver+BC|Seattle&destinations=San+Francisco|Victoria+BC&key=AIzaSyAYtdgKqjDivyTKd2CcHbN8h7P2TwWbotk"


function getTimeFromOriginToDest() {
  return request(endpoint).then(
    response => {
      let data = JSON.parse(response);
      console.log(data)
    }
  ).catch(error => console.log("News Error"))
}

module.exports = {getTimeFromOriginToDest: getTimeFromOriginToDest}
