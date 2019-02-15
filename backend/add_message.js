const con = require('./connection');
const url = require('url');

function insert(req, res) {
  const connection = con.connect();
  const parts = url.parse(req.url, true);
  // getting parameters sent in the request url
  const query = parts.query;
  if (query.from_id && query.to_id && query.message) {
    connection.execute(
      'INSERT INTO `messenger_messages`(`from_id`, `to_id`, `message`) VALUES (?,?,?)',
      [query.from_id, query.to_id, query.message],
      function(err, results, fields) {
        res.end('{"status": 0}');
      },
    );
  } else {
    res.end('{"status": -1}');
  }
}

module.exports = {insert};
