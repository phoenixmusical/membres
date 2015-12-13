var s3 = require('../s3');

exports.get = function (req, res, next) {
    var id = req.params.id;
    s3.signGetUrl(id).then(function (signedUrl) {
        res.redirect(signedUrl);
    }).catch(next);
};
