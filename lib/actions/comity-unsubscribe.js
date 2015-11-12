"use strict";
const Comity = require('../models/comity');

module.exports = function (params, context) {
    return Comity.findOne({
        _id: params.comity
    }).exec().then(function (comity) {
        if (!comity) {
            throw new Error("Ce comité n'existe pas");
        }
        var index = comity.members.indexOf(context.user.id);
        if (index >= 0) {
            comity.members.splice(index, 1);
            return comity.save();
        }
    });
};
