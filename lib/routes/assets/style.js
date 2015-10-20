var path = require('path');
var fs = require('fs');
var less = require('less');
var config = require('s-conf');
var Promise = require('bluebird');

var cacheAssets = config.get('cache_assets', false);

var rootPath = path.resolve(__dirname, '../../..');
var entryFilePath = path.join(rootPath, 'assets/style/index.less');
var lessOptions = {
    paths: [path.join(rootPath, 'assets/style'), path.join(rootPath, 'node_modules')],
    filename: 'index.less',
    compress: true
};

function compileLess(){
    return new Promise(function(resolve, reject){
        fs.readFile(entryFilePath, 'utf8', function(err, content){
            if(err){
                return reject(err);
            }
            less.render(content, lessOptions, function(err, result){
                if(err){
                    return reject(err);
                }
                resolve(result.css);
            });
        });
    });
}

function sendCss(promise, res){
    res.header('Content-Type', 'text/css');
    promise.then(function(css){
        res.send(css);
    }, function(err){
        res.status(500);
        res.send((err&&err.message)||String(err));
    });
}

exports.allowAnonymous = true;

var cachedCode = cacheAssets ? compileLess() : null;

exports.get = function(req, res, next){
    sendCss(cachedCode || compileLess(), res);
};
