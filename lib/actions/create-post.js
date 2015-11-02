var Post = require('../models/post');

module.exports = function (params, context) {
    var post = new Post();
    post.name = params.name;
};
