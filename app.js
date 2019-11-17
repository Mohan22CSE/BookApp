var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var booksRouter = require('./routes/books');
var session = require('express-session');

var passport = require('passport');
var mongoose = require('mongoose');

auth = require('./auth');
db = require('./db');
var app = express();
auth(passport);
app.use(passport.initialize());
app.use(session({secret: 'sshh',saveUninitialized: true,resave: true}));

app.get('/', function (req, res) {
  res.render('login',);
})

app.get('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    req.logIn(user, function(err) {
      return res.redirect('/users/' + user.username);
    });
  })(req, res, next);
});

app.get('/auth/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile']
  }));

app.get('/auth/google/callback',function(req, res, next) {
    passport.authenticate('google', function (pro, user, info){
       req.session.id = pro._id;
       req.session.user_id = pro._id;
       req.session.name = pro.name;
      return res.redirect('/index');
    })(req, res, next);
  });

app.get('/logout', (req, res) => {
    req.logout();
    req.session = null;
    // req.session.user_id = null;
    res.redirect('/');
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'model')));


// setting router path

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);


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
  res.render('error');
});

module.exports = app;
