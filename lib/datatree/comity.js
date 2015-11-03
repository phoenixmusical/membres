var Promise = require('bluebird');
var Comity = require('../models/comity');
var Event = require('../models/event');
var Post = require('../models/post');

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

module.exports = function (params, context) {
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
};
