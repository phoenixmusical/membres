"use strict";
const aws = require('aws-sdk');
const Promise = require('bluebird');
const config = require('s-conf');

aws.config.update({
    accessKeyId: config.require('aws.access_key'),
    secretAccessKey: config.require('aws.secret_key'),
});

const bucketName = config.require('s3.bucket');

function getSignedUrl (action, params) {
    return Promise.fromNode(function (callback) {
        const s3 = new aws.S3();
        s3.getSignedUrl(action, params, callback);
    });
}

exports.signGetUrl = function (id) {
    return getSignedUrl('getObject', {
        Bucket: bucketName,
        Key: id,
    });
};

exports.signPutUrl = function (id, mimeType) {
    return getSignedUrl('putObject', {
        Bucket: bucketName,
        Key: id,
        Expires: 60,
        ContentType: mimeType,
        ACL: 'private'
    });
};
