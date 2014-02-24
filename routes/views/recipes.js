var keystone = require('keystone');
var Recipe = keystone.list('Recipe');
 
exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res);
    Recipe.model.find()
        .sort('-createdAt')
        .exec(function(err, recs) {
            if (err) {
                console.log(err);
                return;
            }

            view.render('recipes', {recipes: recs});
        });
}