"use strict";
const Comity = require('../models/comity');

module.exports = function (params, context) {
    return Comity.findOne({
        _id: params.comity
    }).exec().then(function (comity) {
        if (!comity) {
            throw new Error("Ce comité n'existe pas");
        }
        comity.members.push(context.user.id);
        return comity.save();
    });
};
