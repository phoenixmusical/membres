"use strict";
const uuid = require('node-uuid');
const s3 = require('../s3');

module.exports = function (params, context) {
    const id = uuid.v4();
    const mimeType = params.mimeType;
    return s3.signPutUrl(id, mimeType)
        .then(function (signedUrl) {
            return {id, signedUrl};
        });
};
