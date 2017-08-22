var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var jokes = require('./routes/message')
//var jokes = require('')
//var message = require('../message')
// serve back static files
app.use(express.static('server/public'));

// Parse... post request (data becomes req.body)
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/message', jokes)
var port = 5000;

// Creating jokes array




// spinning up the server
app.listen(port, function () {
  console.log('server up on port: ', port);
}); // end spin up server