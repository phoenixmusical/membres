var path = require('path');
var browserify = require('browserify');
var babelify = require('babelify');
var Promise = require('bluebird');
var config = require('s-conf');

var cacheAssets = config.get('cache_assets', false);

var jsPath = path.resolve(__dirname, '../../../client');

function compileCode() {
    return new Promise(function (resolve, reject) {
        browserify(jsPath, {
            paths: [jsPath]
        })
            .transform(babelify)
            .bundle(function (err, code) {
                if (err) {
                    reject(err);
                } else {
                    resolve(code);
                }
            });
    });
}

function sendCode(promise, res) {
    res.header('Content-Type', 'application/javascript');
    promise.then(function(code){
        res.send(code);
    }, function(err){
        res.status(500);
        res.send((err && err.message) || String(err));
    });
}

var cachedCode = cacheAssets ? compileCode() : null;

exports.get = function (req, res, next) {
    sendCode(cachedCode || compileCode(), res);
};
