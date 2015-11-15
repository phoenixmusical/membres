var path = require('path');
var fs = require('fs');
var Promise = require('bluebird');
var ejs = require('ejs');
var config = require('s-conf');
var mailer = require('./mailer');
var User = require('./models/user');

var baseUrl = config.require('base_url');
var viewsPath = path.resolve(__dirname, '../views/mail');

function createTemplate(view, subject) {
    var viewPath = path.join(viewsPath, view) + ".ejs";
    var htmlTemplate = fs.readFileSync(viewPath, 'utf8');

    function sendToUser(user, data) {
        var recipientData = Object.assign({}, data, {
            recipient: user,
            baseUrl: baseUrl
        });
        return mailer.sendMail({
            to: user.email,
            subject: ejs.render(subject, recipientData),
            html: ejs.render(htmlTemplate, recipientData)
        });
    }

    return function (users, data) {
        return Promise.each(users, function (user) {
            if (typeof user === 'string') {
                return User.findOne({_id: user}).exec().then(function (user) {
                    if (!user) {
                        throw new Error("User not found");
                    }
                    return sendToUser(user, data);
                });
            }
            return sendToUser(user, data);
        });
    };
}

exports.newMessage = createTemplate('newMessage', "Nouveau message dans <%= post.name %>");
