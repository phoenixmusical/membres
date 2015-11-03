var Promise = require('bluebird');
var Post = require('../models/post');

function getPost(params) {
    return Promise.resolve(
        Post.findOne({
            _id: params.post
        })
        .populate('comity')
        .populate('creator')
        .populate('items.author')
        .exec()
    );
}

module.exports = function (params, context) {
    return getPost(params).then(function (post) {
        return {
            post: {
                id: post.id,
                name: post.name,
                comity: {
                    id: post.comity.id,
                    name: post.comity.name
                },
                dateUpdated: post.dateUpdated,
                dateCreated: post.dateCreated,
                creator: {
                    id: post.creator.id,
                    name: post.creator.name
                }
            },
            messages: post.items.map(function (item, index) {
                return {
                    id: index + 1,
                    date: item.date,
                    item_type: item.item_type,
                    author: {
                        id: item.author.id,
                        name: item.author.name
                    },
                    content: item.content
                }
            }).sort(function (a, b) {
                if (a.date < b.date) {
                    return 1;
                } else if(a.date > b.date) {
                    return -1;
                } else {
                    return 0;
                }
            })
        };
    });
};
