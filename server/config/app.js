let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
var router = express.Router();

let app = express();
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');

// create a user model instance
let userModel = require('../models/user');
let User = userModel.User;
// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

let mongoose = require('mongoose');
let mongoDB = mongoose.connection;
let DB = require('./db');
//mongoose.connect('mongodb://127.0.0.1:27017/BookLib');
mongoose.connect(DB.URI);
mongoDB.on('error',console.error.bind(console,'Connection Error'));
mongoDB.once('open',()=>{console.log("Mongo DB is connected")});
//mongoose.connect(DB.URI);
// Set-up Express-Session
app.use(session({
  secret:"SomeSecret",
  saveUninitialized:false,
  resave:false
}));
// initialize flash-connect
app.use(flash());
passport.use(User.createStrategy());
// Serialize and Deserialize user information
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 

// initialize the passport
app.use(passport.initialize());
app.use(passport.session());

let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let exerciseRouter = require('../routes/exercise');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/exerciselist', exerciseRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{title:'Error'});
});

module.exports = app;
