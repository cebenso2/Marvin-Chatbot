'use strict';

var fs = require('fs');
var googleAuth = require('google-auth-library');
var Scopes = require('./Scopes');

//gets callback url to authorize user
function getAuthorizationUrl(cb) {
  //app client secret is stored on server
  fs.readFile('client_secret.json', function(err, data) {
    if (err) {
      return cb(err);
    }
    var credentials = JSON.parse(data);
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
  });
}
module.exports = {getAuthorizationUrl:getAuthorizationUrl}
/*getAuthorizationUrl(function(err, url) {
  if (err) {
    console.log('err:', err);
  } else {
    console.log(url);
  }
});*/
