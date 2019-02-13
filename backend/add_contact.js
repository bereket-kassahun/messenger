const con = require('./connection')
const url = require('url')

function insert(req, res){

  const connection = con.connect()
  const parts = url.parse(req.url, true);
  const query = parts.query;

  if(query.id && query.contact_username){
    connection.execute(
        'SELECT * from `messenger_users` WHERE `username`=?',
        [query.contact_username],
        function(err, results, fields) {
          // res.end('[{"status": 0}]')
        json_result = JSON.stringify(results)
        if(json_result != '[]'){
          const contact_id = results[0].id
              connection.execute(
                'INSERT INTO `messenger_contacts`(`id`, `contact_id`) VALUES (?,?)',
                [query.id, contact_id],
                function(err, results, fields) {
                  // console.log('results[0].id')
                    res.end('{"contact_id":'+contact_id+ ', "username":"'+query.contact_username+'"}')
                }
          );
        }else{
          res.end('{"id": -1}')
        }
        }
    );
    
  }else{
    res.end('{"id": -1}')
  }
}

module.exports = {insert}