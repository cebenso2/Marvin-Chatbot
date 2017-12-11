'use strict';

var fs = require('fs');
var googleAuth = require('google-auth-library');
var Scopes = require('./Scopes');
let client_secret = '{"web":{"client_id":"696019611227-5m62hp5vit4ossvpv7pemo92prrlric8.apps.googleusercontent.com","project_id":"marvinassistantc-1512373709006","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://accounts.google.com/o/oauth2/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"Ce7jPpvZ7x4nUXJqnzr8DJzE","redirect_uris":["http://marvin-assistant.herokuapp.com/"],"javascript_origins":["http://marvin-assistant.herokuapp.com"]}}'

//gets callback url to authorize user
function getAuthorizationUrl(cb) {
  //app client secret is stored on server
  console.log("run");
  var credentials = JSON.parse(client_secret);
  var clientSecret = credentials.web.client_secret;
  var clientId = credentials.web.client_id;
  var redirectUrl = credentials.web.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: Scopes.Scope
  });
  return cb(null, authUrl);
}
module.exports = {getAuthorizationUrl:getAuthorizationUrl}
/*getAuthorizationUrl(function(err, url) {
  if (err) {
    console.log('err:', err);
  } else {
    console.log(url);
  }
});*/
