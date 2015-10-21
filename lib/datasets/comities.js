var socket = require('../socket');
var Comity = require('../models/comity');

socket.subscription('/comities', function () {});

function formatData(data) {
    return {
        id: data._id,
        name: data.name
    };
}

socket.expose('/comities/list', function () {
    return Comity.find().exec().then(function (results) {
        return results.map(formatData);
    });
});
