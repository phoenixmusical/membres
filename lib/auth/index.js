var passport = require('passport');
var User = require('../models/user');

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, done);
});

passport.use('local-login', require('./local-login'));
passport.use('local-signup', require('./local-signup')); 
//passport.use(require('./google'));
//passport.use(require('./facebook'));
