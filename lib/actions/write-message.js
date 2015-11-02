var Post = require('../models/post');

module.exports = function (params, context) {
    return Post.findOne({
        _id: params.post
    }).exec().then(function (post) {
        if (!post) {
            throw new Error("Ce post n'existe pas");
        }
        post.items.push({
            type: 'message',
            content: params.text,
            author: context.user.id,
            date: new Date()
        });
        return post.save();
    });
};
