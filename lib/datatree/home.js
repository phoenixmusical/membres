var Promise = require('bluebird');
var Comity = require('../models/comity');

function formatComity(comity) {
    return {
        id: comity.id,
        name: comity.name
    };
}

function listComities() {
    return Promise.resolve(Comity.find().exec());
}

module.exports = function (params, context) {
    return listComities().then(function (comities) {
        return {
            comities: comities.map(formatComity)
        };
    });
};
