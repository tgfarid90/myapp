var express = require('express');
var path = require('path');
var cfenv = require("cfenv");
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Cloudant = require('cloudant');
var nano = require('nano');

var index = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');
var models = require('./models/cloudant-connector');

// Global Varible Declaration 

var mydb;
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/api', api);
app.use('/cloudant-connector', models);



 module.exports = app;
