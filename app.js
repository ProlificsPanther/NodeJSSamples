var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var hbs = require('express-handlebars');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('ajax-request');
var session = require('express-session');
var user_data = require('./routes/user_data');
var profile_data = require('./routes/profile_data');
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/test');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var app = express();

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(session({secret:'mysession',resave:false,saveUninitialized:true}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user_data', user_data);
app.use('/profile_data', profile_data);

////////////////////////////////
app.post('/index',function(req,res){
console.log('INSIDE APP.POST');
var myname = req.body.user_name;
var mypasswd = req.body.passwordtxt;
if(myname =='subhan@gmail.com' && mypasswd == 'pass123'||myname =='kartikey@gmail.com' && mypasswd == 'pass123'||myname =='moulika@gmail.com' && mypasswd == 'pass123')
{
req.session.user_name = req.body.user_name;
req.session.passwordtxt = req.body.passwordtxt; 
//res.render('http://10.0.10.176:8082/login_new_router');
console.log(req.body.user_name);
  res.end('done');
}
else{
  
  console.log('No Session Set');
}
});

app.get('/index',function(req,res){
console.log('INSIDE APP.GET PROFILE');
  if(req.session.name){
    console.log('in get session');
    res.redirect('/profile_data/profile_router_get');
  }
  else{
    res.sendFile(path.join(__dirname + '/routes/login.html'));
  }
});

app.get('/logout',function(req,res){
  console.log('INSIDE APP.GET LOGOUT');
  req.session.destroy(function(err){
      if(err){
        res.negotiate(err);
      }
      res.redirect('/profile_data/login_router_get');
    });
  
});


///////////

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
