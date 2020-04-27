var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var editable = require('./routes/editable');
var mongo = require('mongodb').MongoClient;
var cookieParser = require('cookie-parser');
var objectId = require('mongodb').ObjectID;
var bodyParser = require('body-parser');
var assert = require('assert');
var url = 'mongodb://localhost:27017/test';

app.set('view engine', 'ejs');
app.use('/css', express.static(__dirname + '/public'));
app.use('/js', express.static(__dirname + '/public'));
app.use('/png', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/editable', editable);
app.get('/home', function(req, res, next) {
	res.sendFile(path.join(__dirname + '/routes/home.html'));
	});
app.get('/dashboardhelp', function(req, res, next) {
	res.sendFile(path.join(__dirname + '/routes/dashboardhelp.html'));
	});
app.get('/teamedit', function(req, res, next) {
	res.sendFile(path.join(__dirname + '/routes/teamedit.html'));
	});
app.get('/teamlist', function(req, res, next) {
	res.sendFile(path.join(__dirname + '/routes/teamlist.html'));
	});
// listen on port 8000 (for localhost) or the port defined for heroku //blah
var port = process.env.PORT || 8092;
app.listen(port);

module.exports = app;