var fs = require('fs');

var actionsList = fs.readdirSync(__dirname).filter(function (filename) {
    return filename.substr(-3) === '.js' && filename !== 'index.js';
}).map(function (filename) {
    return filename.substr(0, filename.length - 3);
});

actionsList.forEach(function (actionName) {
    exports[actionName] = require('./' + actionName);
});
