var path = require('path');
var browserify = require('browserify');
var babelify = require('babelify');

var jsPath = path.resolve(__dirname, '../../../client');

exports.get = function (req, res, next) {
    res.header('Content-Type', 'application/javascript');
    browserify(jsPath, {
        paths: [jsPath]
    })
        .transform(babelify)
        .bundle()
        .pipe(res);
};
