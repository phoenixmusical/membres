var socket = require('../socket');
var Comity = require('../models/comity');
var Event = require('../models/event');
var Post = require('../models/post');

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

socket.expose('/comities/get', function (id) {
    return Comity.findOne({
        id: id
    })
        .exec()
        .then(function (comity) {
            return results.map(formatData);
        });
});
