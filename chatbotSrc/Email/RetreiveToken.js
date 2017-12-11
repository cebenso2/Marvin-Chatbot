'use strict';

var fs = require('fs');
var googleAuth = require('google-auth-library');
let client_secret = '{"web":{"client_id":"696019611227-5m62hp5vit4ossvpv7pemo92prrlric8.apps.googleusercontent.com","project_id":"marvinassistantc-1512373709006","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://accounts.google.com/o/oauth2/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"Ce7jPpvZ7x4nUXJqnzr8DJzE","redirect_uris":["http://marvin-assistant.herokuapp.com/"],"javascript_origins":["http://marvin-assistant.herokuapp.com"]}}'


//gets authorization token from google
function getAuthorizationToken(code, cb) {
  // Load client secrets
  var credentials = JSON.parse(data);
  var clientSecret = credentials.web.client_secret;
  var clientId = credentials.web.client_id;
  var redirectUrl = credentials.web.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  oauth2Client.getToken(code, function(err, token) {
    if (err) {
      return cb(err);
    }
    return cb(null, token);
  });
}
module.exports = {getAuthorizationToken: getAuthorizationToken}

/*if (process.argv.length != 3) {
  console.log('usage: node get_token token');
  process.exit(1);
}
var token = process.argv[2];

getAuthorizationToken(token, function(err, file) {
  if (err) {
    console.log('err:', err);
  } else {
    console.log('authorization token is in:\n', file);
  }
});*/
