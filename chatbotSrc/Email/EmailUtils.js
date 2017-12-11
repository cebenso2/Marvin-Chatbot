'use strict';

//var fs = require('fs');
var googleAuth = require('google-auth-library');
var google = require('googleapis');
let client_secret = '{"web":{"client_id":"696019611227-5m62hp5vit4ossvpv7pemo92prrlric8.apps.googleusercontent.com","project_id":"marvinassistantc-1512373709006","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://accounts.google.com/o/oauth2/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"Ce7jPpvZ7x4nUXJqnzr8DJzE","redirect_uris":["http://marvin-assistant.herokuapp.com/"],"javascript_origins":["http://marvin-assistant.herokuapp.com"]}}'
let token = '{"access_token":"ya29.GlsYBSrqn9MVnUP9PPqXFFLWIhDPYQ8opVqRVva56oJkNEDnVvYIbRn-VV8nmKfHw8c3KE6ehvPVZMwuceOdWNOFzdLlD7MjgjvVb5PGzE-dfO0pp0dNkht8i6ou","refresh_token":"1/d34vYxhHrS7L3E-6w8lgQz_hIi34eH74Gom5fUhZxBg","token_type":"Bearer","expiry_date":1512403893095}'

// Tutorial and code for some of this is based on http://pcarion.com/2015/12/06/How-to-send-a-mail-in-node-using-the-gmail-API.html
//authenticates for sending email using stored file
function getOAuth2Client(cb) {
  // Load client secrets
  var credentials = JSON.parse(client_secret);
  var clientSecret = credentials.web.client_secret;
  var clientId = credentials.web.client_id;
  var redirectUrl = credentials.web.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
  // Load credentials
  oauth2Client.credentials = JSON.parse(token);
  return cb(null, oauth2Client);
}

function getOAuth2ClientFromToken(tk, cb) {
  // Load client secrets
  var credentials = JSON.parse(client_secret);
  var clientSecret = credentials.web.client_secret;
  var clientId = credentials.web.client_id;
  var redirectUrl = credentials.web.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
  // Load credentials
  oauth2Client.credentials = tk;
  return cb(null, oauth2Client);
}

//uses authentication and sends the email
function sendEmail(auth, to, subject, content, cb) {
  var gmailClass = google.gmail('v1');

  var email_lines = [];

  email_lines.push('From: Something Else');
  email_lines.push('To: '+to);
  email_lines.push('Content-type: text/html;charset=iso-8859-1');
  email_lines.push('MIME-Version: 1.0');
  email_lines.push('Subject: '+subject);
  email_lines.push('');
  email_lines.push(content);

  var email = email_lines.join('\r\n').trim();

  var base64EncodedEmail = new Buffer(email).toString('base64');
  base64EncodedEmail = base64EncodedEmail.replace(/\+/g, '-').replace(/\//g, '_');

  gmailClass.users.messages.send({
    auth: auth,
    userId: 'me',
    resource: {
      raw: base64EncodedEmail
    }
  }, cb);
}

//uses authentication and sends the email
function getProfile(auth, cb) {
  var gmailClass = google.gmail('v1');
  gmailClass.users.getProfile({
    auth: auth,
    userId: 'me'
  }, cb);
}

//Authenticates user and then send the email
function sendMail(to, subject, content){
  getOAuth2Client(function(err, oauth2Client) {
    if (err) {
      console.log('err:', err);
    } else {
      sendEmail(oauth2Client, to, subject, content, function(err, results) {
        if (err) {
          console.log('err:', err);
        } else {
          console.log(results);
        }
      });
    }
  });
}

function getEmail(token, cb){
  getOAuth2ClientFromToken(token, function(err, oauth2Client) {
    if (err) {
      console.log('err:', err);
    } else {
      getProfile(oauth2Client, function(err, results) {
        if (err) {
          console.log('err:', err);
          cb(null)
        } else {
          console.log(results);
          cb(results.emailAddress);
        }
      });
    }
  });
}
module.exports = {sendMail: sendMail, getOAuth2Client: getOAuth2Client, getEmail: getEmail}
//sendMail('cebenso2@illinois.edu', 'Dynamic', 'This is written in new text');
