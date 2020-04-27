var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var favicon = require('serve-favicon');
var logger = require('morgan');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var request = require('ajax-request');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var userDataSchema = new Schema({
  user_name: {type: String, required: true, unique: true},
  passwordtxt: {type: String, required: true}
}, {collection: 'user-data'});

var UserData = mongoose.model('UserData', userDataSchema);
userDataSchema.plugin(uniqueValidator);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


router.get('/signup_router_get', function(req, res,next) {
console.log("in signup get router");
   res.sendFile(path.join(__dirname + '/signup.html'));
});


router.post('/signup_router_get', function(req, res, next) {
  console.log('IN SIGNUP POST');
  var user_name = req.body.user_name;
              var passwordtxt = req.body.passwordtxt;
              console.log('IN SIGNUP ROUTER POST SESSION VALUE'+user_name);
              var item = {
              user_name: user_name,
              passwordtxt: passwordtxt
              };
console.log(item);
  var data = new UserData(item);
  data.save();
  console.log(data+"data");
  console.log('Item inserted');
 res.end("done");
});

  
module.exports = router;