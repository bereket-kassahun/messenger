
const con = require('./connection')
const url = require('url')

function fetch(req, res){

  const connection = con.connect()
  var parts = url.parse(req.url, true);
  var query = parts.query;
  if(query.id && query.contact_id){
    console.log(query.id)
    console.log(query.contact_id)
    connection.execute("SELECT  SQL_NO_CACHE messenger_contacts.online  FROM `messenger_contacts` WHERE  id=?  AND contact_id=?", 
    [query.id, query.contact_id],
    function(err, results, fields) {
      const live = results
      connection.execute(
        "SELECT SQL_NO_CACHE * FROM messenger_messages WHERE (from_id=? AND to_id=?) OR (from_id=? AND to_id=?) ORDER BY message_id",
        [query.id, query.contact_id, query.contact_id, query.id],
        function(err, messages, fields) {
         
          let result = {live, messages}
          result = JSON.stringify(result)
          res.end(result)
          console.log(result)

          connection.execute(
          'update `messenger_messages` set `seen`=1 where `to_id`=?',
          [query.id], function(err, result, fields){
            console.log(err)
          });
        }
      );
    });
 
}else{
  
    res.end('{"error": -1}')
}
}

module.exports = {fetch}