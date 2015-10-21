var passport = require('passport');

passport.serializeUser(require('./serialize-user'));
passport.deserializeUser(require('./deserialize-user'));

passport.use('local-login', require('./local-login'));
passport.use('local-signup', require('./local-signup'));
