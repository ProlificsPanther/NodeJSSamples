var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var request = require('ajax-request');
var session = require('express-session');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var ProfileDataSchema = new Schema({
  hobby: {type: String},
  graduate: {type: String},
  webseries: {type: String},
  tvseries: {type: String},
  name: {type: String, unique: true},
  gaming: {type: String},
  movie: {type: String}
}, {collection: 'profile-data'});

var ProfileData = mongoose.model('ProfileData', ProfileDataSchema);
ProfileDataSchema.plugin(uniqueValidator);

app.use(session({secret:'mysession',resave:false,saveUninitialized:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.get('/login_router_get', function(req, res, next) {
    res.sendFile(path.join(__dirname + '/login.html'));
  });

  router.post('/login_router_post', function(req, res, next) {
  
  console.log('IN POST');
  var user_name = req.session.user_name;
              var passwordtxt = req.session.passwordtxt;
              console.log('IN LOGIN ROUTER POST SESSION VALUE'+req.session.user_name);
              request({
            
              type: 'POST',
              url: 'http://10.0.10.176:9080/PEGServer/subhan.lib/login_session/get_data', 
              async: false,
              data: { user_name : user_name, passwordtxt : passwordtxt }, 
              dataType: 'json'
          
              },
               function(err, res, body){
              var json = JSON.parse(body);
              console.log(json+"in ajax call");
              console.log(json.name);
              var item = json;
               //var item ={body};
 
console.log(item);
console.log('Item inserted');

  var data = new ProfileData(item);
  data.save();
  
});
res.json(user_name);
    });

    router.get('/profile_router_get', function(req, res, next) {
    if(req.session.user_name){
    console.log('in get session new router');
    //res.redirect('/login_new_router');
    res.sendFile(path.join(__dirname + '/profile.html'));
  }
  else{
    res.sendFile(path.join(__dirname + '/login.html'));
  }
});
  

router.post('/profile_router_post',urlencodedParser,function(req,res, next){
    
              console.log('IN POST');
              console.log(req.body);
              var user_name = req.session.user_name;
              var passwordtxt = req.session.passwordtxt;
              
user_name = req.body.user_name;
passwordtxt = req.body.passwordtxt; 
console.log('IN PROFILE ROUTER POST SESSION VALUE'+req.session.user_name);
});
 
router.get('/profile_router_get_receive', function(req, res, next) {
    console.log('IN RECIEVE DATA');

    
  ProfileData.find()
      .then(function(doc) {
        res.json(doc);
      });
});


router.get('/profile_router_get_response', function(req, res, next) {
    console.log('in  response');
var user_name = req.session.user_name ;
console.log(user_name);
    res.end(user_name);
});

module.exports = router;