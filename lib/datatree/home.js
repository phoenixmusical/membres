var Promise = require('bluebird');
var Comity = require('../models/comity');
var Event = require('../models/event');
var Post = require('../models/post');

function loadRessources(query, formatter) {
    return Promise.resolve(query.exec()).then(function (list) {
        return list.map(formatter);
    });
}

function loadEvents(comities) {
    var events = Event.find({
        comity: {$in: comities}
    });
    return loadRessources(events, function (event) {
        return {
            id: event.id,
            name: event.name,
            start: event.start,
            end: event.end,
            comity: event.comity
        };
    });
}

function loadPosts(comities) {
    var posts = Post.find({
        comity: {$in: comities}
    }).populate('comity');
    return loadRessources(posts, function (post) {
        return {
            id: post.id,
            name: post.name,
            dateUpdated: post.dateUpdated,
            comity: {
                id: post.comity.id,
                name: post.comity.name
            }
        };
    });
}

function loadComities(userId) {
    var comities = Comity.find({
        members: userId
    });
    return loadRessources(comities, function (comity) {
        return comity.id;
    });
}

module.exports = function (params, context) {
    return loadComities(context.user.id)
        .then(function (comities) {
            return Promise.props({
                events: loadEvents(comities),
                posts: loadPosts(comities)
            });
        });
};
