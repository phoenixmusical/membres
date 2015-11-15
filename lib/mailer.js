var nodemailer = require('nodemailer');
var sendgridTransport = require('nodemailer-sendgrid-transport');
var Promise = require('bluebird');
var config = require('s-conf');

var transport = sendgridTransport({
    auth: {
        api_key: config.require('sendgrid_api_key')
    }
});

var mailer = nodemailer.createTransport(transport);

exports.sendMail = function (mail) {
    mail.from = "Phoenix Musical <notification@phoenixmusical.ca>";
    return new Promise(function (resolve, reject) {
        console.log('sendMail', mail);
        mailer.sendMail(mail, function (err, result) {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};
