'use strict';

var fs = require('fs');
var googleAuth = require('google-auth-library');
var google = require('googleapis');

//authenticates for sending email using stored file
function getOAuth2Client(cb) {
  // Load client secrets
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
    // Load credentials
    fs.readFile('gmail-credentials.json', function(err, token) {
      if (err) {
        return cb(err);
      } else {
        oauth2Client.credentials = JSON.parse(token);
        return cb(null, oauth2Client);
      }
    });
  });
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
module.exports = {sendMail: sendMail}
//sendMail('cebenso2@illinois.edu', 'Dynamic', 'This is written in new text');
