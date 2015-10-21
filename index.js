var mongoose = require('mongoose');
var config = require('s-conf');

mongoose.connect(config.require('db'));

require('./lib/datasets');
require('./lib/server');
