"use strict";
const Post = require('../models/post');

module.exports = function (params, context) {
    return Post.findOne({
        _id: params.post
    }).exec().then(function (post) {
        if (!post) {
            throw new Error("Ce post n'existe pas");
        }
        const message = post.items[params.message - 1];
        if (!message) {
            throw new Error("Ce message n'existe pas");
        }
        message.content = params.content;
        return post.save();
    });
};
