var keystone = require('keystone');
var Archive = keystone.list('Archive');
 
exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res);
    Archive.model.find()
        .sort('-createdAt')
        .exec(function(err, archives) {
            if (err) {
                console.log(err);
                return;
            }

            view.render('archives', {archives: archives});
        });
}