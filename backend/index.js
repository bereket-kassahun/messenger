const http = require('http');
const get_users = require('./get_users');

const add_user = require('./add_user');

var app = http.createServer(function(req, res) {
  let url = req.url;
  url = url.split('?');
  url = url[0];
  // res.setHeader('Content-Type', 'application/json');
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });
  if (url == '/get_user') {
    get_users.fetch(req, res);
  } else if (url == '/add_user') {
    add_user.insert(req, res);
  }
});
app.listen(3000);
