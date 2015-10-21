var User = require('../models/user');

module.exports = function(id, done){
    User.findById(id, done);
};
