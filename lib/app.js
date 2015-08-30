var path = require('path');
var express = require('express');
var ejsMate = require('ejs-mate');

var app = module.exports = express();

app.engine('ejs', ejsMate);
app.set('views', path.resolve(__dirname, '..', 'views'));
app.set('view engine', 'ejs');

app.use(require('./routes'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
