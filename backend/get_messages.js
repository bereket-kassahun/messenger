const con = require('./connection');
const url = require('url');

function fetch(req, res) {
  const connection = con.connect();
  var parts = url.parse(req.url, true);
  // getting parameters sent in the request url
  var query = parts.query;
  if (query.id && query.contact_id) {
    // getting the status of our contact(if he/she is live or not)
    connection.execute(
      'SELECT  SQL_NO_CACHE messenger_contacts.online  FROM `messenger_contacts` WHERE  id=?  AND contact_id=?',
      [query.id, query.contact_id],
      function(err, results, fields) {
        const live = results;
        //retriving messages we sent and our contact sent to us
        connection.execute(
          'SELECT SQL_NO_CACHE * FROM messenger_messages WHERE (from_id=? AND to_id=?) OR (from_id=? AND to_id=?) ORDER BY message_id',
          [query.id, query.contact_id, query.contact_id, query.id],
          function(err, messages, fields) {
            //concatenating both informations
            let result = {live, messages};
            result = JSON.stringify(result);
            res.end(result);
            // assuming result is sent, we set the message status to seen(1).
            connection.execute(
              'update `messenger_messages` set `seen`=1 where `to_id`=?',
              [query.id],
              function(err, result, fields) {},
            );
          },
        );
      },
    );
  } else {
    res.end('{"error": -1}');
  }
}

module.exports = {fetch};
