var Post = require('../models/post');
var notifier = require('../notifier');

module.exports = function (params, context) {
    return Post.findOne({
        _id: params.post
    }).populate('comity').exec().then(function (post) {
        if (!post) {
            throw new Error("Ce post n'existe pas");
        }
        var message = {
            type: 'message',
            content: params.text,
            files: params.files,
            author: context.user.id,
            date: new Date()
        };
        console.log('message', message);
        post.items.push(message);
        return post.save().then(function () {
            var currentUserId = String(context.user.id);
            var recipients = post.comity.members.map(String).filter(function (userId) {
                return userId !== currentUserId;
            });
            return notifier.newMessage(recipients, {
                post: post,
                message: message,
                author: context.user
            });
        });
    });
};
