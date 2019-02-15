const con = require('./connection');
const url = require('url');

function fetch(req, res) {
  const connection = con.connect();
  var parts = url.parse(req.url, true);
  // getting parameters sent in the request url
  var query = parts.query;
  if (query.id) {
    //retriving contact information from messenger_users and messenger_conatacs
    connection.execute(
      'SELECT messenger_contacts.contact_id, messenger_users.username, messenger_contacts.online FROM messenger_users INNER JOIN messenger_contacts ON messenger_users.id=messenger_contacts.contact_id WHERE messenger_contacts.id=?',
      [query.id],
      function(err, results, fields) {
        res.end(JSON.stringify(results));
      },
    );
  }
}

module.exports = {fetch};
