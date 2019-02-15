const http = require('http');
const get_users = require('./get_users');
const get_contacts = require('./get_contacts');
const get_messages = require('./get_messages');
const add_contact = require('./add_contact');
const add_user = require('./add_user');
const add_message = require('./add_message');
const set_online = require('./set_online');
const unset_online = require('./unset_online');
const delete_contact = require('./delete_contact');

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
  } else if (url == '/get_contacts') {
    get_contacts.fetch(req, res);
  } else if (url == '/get_messages') {
    get_messages.fetch(req, res);
  } else if (url == '/add_contact') {
    add_contact.insert(req, res);
  } else if (url == '/add_user') {
    add_user.insert(req, res);
  } else if (url == '/add_message') {
    add_message.insert(req, res);
  } else if (url == '/set_online') {
    set_online.set(req, res);
  } else if (url == '/unset_online') {
    unset_online.unset(req, res);
  } else if (url == '/delete_contact') {
    delete_contact.remove(req, res);
  }
});
app.listen(3000);
