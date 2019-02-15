const con = require('./connection');
const url = require('url');

function remove(req, res) {
  const connection = con.connect();
  var parts = url.parse(req.url, true);
  // getting parameters sent in the request url
  var query = parts.query;

  if (query.id && query.contact_id) {
    connection.execute(
      'DELETE FROM `messenger_contacts` WHERE `id`=? and `contact_id`=?',
      [query.id, query.contact_id],
      function(err, results, fields) {
        res.end('{"status":0}');
      },
    );
  } else {
    res.end('{"status":-1}');
  }
}

module.exports = {remove};
