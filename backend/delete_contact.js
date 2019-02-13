
const con = require('./connection')
const url = require('url')

function remove(req, res){

  const connection = con.connect()
  var parts = url.parse(req.url, true);
  var query = parts.query;

  console.log('removing contacts')
  if(query.id && query.contact_id){
    connection.execute(
        'DELETE FROM `messenger_contacts` WHERE `id`=? and `contact_id`=?',
        [query.id, query.contact_id],
        function(err, results, fields) {
          res.end('{"status":1}')
        //   console.log(JSON.stringify(results))
        }
      );
  }else{
    res.end('{"status":0}')
  }
}

module.exports = {remove}