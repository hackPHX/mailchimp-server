
/*
 * GET home page.
 */

var MailChimpAPI = require('mailchimp').MailChimpAPI;
var config = require('../config');

try {
  var api = new MailChimpAPI(config.apiKey, { version : '1.3', secure : false });
} catch (error) {
  console.log(error.message);
}

// api.listMembers({
//   id: listID
// }, function (error, data) {
//   if (error){
//     console.log(error.message);
//   } else {
//     console.log(JSON.stringify(data)); // Do something with your data!
//   }
// });

exports.index = function(req, res){
  api.listSubscribe({
    id: config.listID,
    email_address: req.query.email,
    merge_vars: {
      FNAME: req.query.firstName,
      LNAME: req.query.lastName
    }
  }, function (error, data) {
    if (error){
      console.log(error.message);
      res.end('An error has occurred. Please try again.');
    } else {
      if(data === true){
        res.end('Please check your email to confirm your subscription.');
      } else {
        res.end(JSON.stringify(data));
      }
    }
  });
};