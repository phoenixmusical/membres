var Promise = require('bluebird');
var Comity = require('../models/comity');
var Event = require('../models/event');
var Post = require('../models/post');
var User = require('../models/user');

function formatComity(comity) {
    return {
        id: comity.id,
        name: comity.name
    };
}

function listComities() {
    return Promise.resolve(Comity.find().exec());
}

function getComity(params) {
    return Promise.resolve(Comity.findOne({
        _id: params.comity
    }).exec());
}

function getEventsByComity(params) {
    return Promise.resolve(Event.find({
        comity: params.comity
    }).exec());
}

function getPostsByComity(params) {
    return Promise.resolve(Post.find({
        comity: params.comity
    }).exec());
}

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

module.exports = {
    app: function (params, context) {
        return listComities().then(function (comities) {
            return {
                comities: comities.map(formatComity),
                user: {
                    id: context.user.id,
                    email: context.user.email,
                    name: context.user.name,
                    isAdmin: context.user.isAdmin
                }
            };
        });
    },
    home: function (params, context) {
        return listComities().then(function (comities) {
            return {
                comities: comities.map(formatComity)
            };
        });
    },
    comity: function (params, context) {
        return Promise.props({
            comity: getComity(params),
            events: getEventsByComity(params),
            posts: getPostsByComity(params)
        }).then(function (result) {
            if (!result.comity) {
                throw new Error("Comitiy not found");
            }
            return {
                comity: {
                    id: result.comity.id,
                    name: result.comity.name
                },
                events: result.events.map(function (event) {
                    return {
                        id: event.id,
                        name: event.name,
                        start: event.start,
                        end: event.end
                    };
                }),
                posts: result.posts.map(function (post) {
                    return {
                        id: post.id,
                        name: post.name,
                        dateUpdated: post.dateUpdated
                    };
                })
            };
        });
    },
    post: function (params, context) {
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
    }
};
