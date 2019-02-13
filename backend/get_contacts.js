
const con = require('./connection')
const url = require('url')

function fetch(req, res){

  const connection = con.connect()
  var parts = url.parse(req.url, true);
  var query = parts.query;

  console.log('contacts')
  connection.execute(
    'SELECT messenger_contacts.contact_id, messenger_users.username, messenger_contacts.online FROM messenger_users INNER JOIN messenger_contacts ON messenger_users.id=messenger_contacts.contact_id WHERE messenger_contacts.id=?',
    [query.id],
    function(err, results, fields) {
      res.end(JSON.stringify(results))
      console.log(JSON.stringify(results))
    }
  );
}

module.exports = {fetch}