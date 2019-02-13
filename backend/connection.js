const mysql = require('mysql2');
function connect(){
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'vertrigo',
        database: 'messenger'
      });
}

module.exports = {connect}