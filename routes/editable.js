var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var path = require('path');

var url = 'mongodb://localhost:27017/test';

/* GET home page. */


router.get('/getdata', function(req, res, next) {
	console.log("in get-data");
	//console.log(req.body.con);
  var resultArray = [];
  var str;
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var cursor = db.collection('markdown').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
	  console.log(resultArray);
	  str += JSON.stringify(doc);
	  //console.log(str);
	  
    }, function() {
		
      db.close();
	  //console.log(str);
	res.send(resultArray);
	  //res.render({items: resultArray});
      
    });
	
  });
  //console.log(resultArray+"RESULT");
  
});

router.post('/insert', function(req, res, next) {
	console.log("in insert");
	console.log(req.body);
	console.log(req.body.title);
	console.log(req.body.content);
  var item = {
    content: req.body.content,
	title: req.body.title
  };

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('markdown').insertOne(item, function(err, result) {
      assert.equal(null, err);
      console.log('Item inserted');
      db.close();
	  
    });
  });

res.send("done");  
});

router.post('/update', function(req, res) {
	console.log("in upadte");
	console.log(req.body.content);
	console.log(req.body.title);
  var item = {
    content: req.body.content
    };
  var title = req.body.title;

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('markdown').updateOne({"title": title}, {$set: item}, function(err, result) {
      assert.equal(null, err);
      console.log('Item updated');
      db.close();
    });
  });
  res.send("done");
});

module.exports = router;