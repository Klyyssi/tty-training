var express = require('express');
var app = express();

var config = require('./config.json');

var db = null;
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://' + config.dbHost + ':' + config.dbPort + '/' + config.dbName;
MongoClient.connect(url, function(err, mdb) {
	if (!err) {
		console.log("Connected correctly to server");
		db = mdb;
	} else {
		console.log("Could not connect to database");
		process.exit();
	}
});

app.get('/', function (req, res) {
  res.send('Hello World!');
})

app.get('/' + config.dbName + '/' + config.collectionName, function(req, res) {
	var collection = db.collection(config.collectionName);
	collection.find({}).toArray(function(err, docs) {
		if (!err) {
			res.json({rows: docs});
		} else {
			res.status(500).send('Internal error');
		}
	});
});

app.listen(config.serverPort, function () {
  console.log('Listening on port ' + config.serverPort + '!');
});

process.on('exit', function () {
	if (db != null) {
		db.close();
	}
});