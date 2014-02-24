var keystone = require('keystone');
var Recipe = keystone.list('Recipe');
 
exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res);
    Recipe.model.findOne()
        .where('slug', req.params.slug)
        .populate('author')
        .exec(function(err, rec) {
            if (err) {
                console.log(err);
                return;
            }

            view.render('recipe', {recipe: rec});
        });
}