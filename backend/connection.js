const mysql = require('mysql2');
// connecting to mysql database
function connect() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'vertrigo',
    database: 'messenger',
  });
}

module.exports = {connect};
