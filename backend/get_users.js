const con = require('./connection');
const url = require('url');

function fetch(req, res) {
  const connection = con.connect();
  var parts = url.parse(req.url, true);
  // getting parameters sent in the request url
  var query = parts.query;
  if (query.username && query.password) {
    connection.execute(
      'SELECT * FROM `messenger_users` WHERE `username` = ? AND `password` = ?',
      [query.username, query.password],
      function(err, results, fields) {
        const response = JSON.stringify(results);
        if (response == '[]') {
          res.end('[{"id": -1}]');
        } else {
          res.end(response);
        }
      },
    );
  }
}

module.exports = {fetch};
