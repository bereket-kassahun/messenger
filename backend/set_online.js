
const con = require('./connection')
const url = require('url')

function set(req, res){

  const connection = con.connect()
  const parts = url.parse(req.url, true);
  const query = parts.query;
  if(query.id){
    connection.execute(
        'update `messenger_contacts` set `online`=1 where `contact_id`=?',
        [query.id],
        function(err, results, fields) {
            res.end(JSON.stringify(err))
        }
    );
  }else{
    res.end('{"status": -1}')
  }
}

module.exports = {set}