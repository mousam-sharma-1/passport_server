var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport =require('passport')
var passportSetup=require('./config/passport-setup')
var routes = require('./routes/routes');
const cookieSession= require('cookie-session')
var app = express();
const mongoose = require('mongoose');
const keys =require('./config/keys')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cookieSession({
  maxAge:24*60*60*1000,
  keys:[keys.cookie.key]
}));

app.use(passport.initialize())
app.use(passport.session())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// con to mongo
mongoose.connect(keys.MongoDB.key,{useNewUrlParser:true,useUnifiedTopology: true },()=>{
  console.log("CON TO MON")
})




app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
