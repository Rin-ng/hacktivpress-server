var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require ('mongoose');
const cors = require('cors');
require ('dotenv').config();

const url = `mongodb://${process.env.DBUSER}:${process.env.DBPASS}@ds021994.mlab.com:21994/hacktivpress`;

mongoose.connect(url,{useNewUrlParser: true} , function(err){
  if(err){
    console.log(err)
  }
  else{
    console.log("Database Connected~")
  }
})


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const articleRouter = require('./routes/articles')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', articleRouter);


module.exports = app;
