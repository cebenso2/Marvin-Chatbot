const test = require('tape');
const EmailUtils = require("./EmailUtils")
const RetreiveUrl = require("./RetreiveUrl")
const RetreiveToken = require("./RetreiveToken")

//do not test send email because it actually sends email


//test get oauth2
test('get oath', (t) => {
  t.plan(1);
  EmailUtils.getOAuth2Client((err, oath) =>{
    t.false(err);
  });
});

test('get token', (t) => {
  t.plan(1);
  let token = "test"
  RetreiveToken.getAuthorizationToken(token, function(err, file) {
    t.true(err);
  });
});

test('get url', (t) => {
  t.plan(1);
  RetreiveUrl.getAuthorizationUrl(function(err, url) {
    t.true(err);
  });
});
