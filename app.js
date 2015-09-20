var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose			= 		require('mongoose');
var passport			=		require('passport');
var database			= 		require('./back/database');
var user				=		require('./back/user');
var methodOverride 		= 		require('method-override');       // simulate DELETE and PUT (express4)
var flash           	= 		require('connect-flash');         //Connect-flash allows for passing session flashdata messages.
var session         	= 		require('express-session');

var app = express();
// connect to the database
var db              	= 		mongoose.connect(database.url).connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback() {
        console.log("...and I'm connected to Mongo DB as well...;)");
    });
//required for passport
require('./middle/passport')(passport); // pass passport for configuration
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

var index = require('./middle/index');
require('./middle/routes')(app);

// view engine setup
app.set('views', path.join(__dirname, 'public/views'));
//app.set('view engine', 'jade');
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.post('/', passport.authenticate('local-login'), function(req, res) {
        console.log(req.user);
        res.json(req.user);
    });

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
