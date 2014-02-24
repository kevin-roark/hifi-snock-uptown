var keystone = require('keystone');
var Post = keystone.list('Post');
 
exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res);

    Post.model.findOne()
        .populate('author')
        .where('slug', req.params.slug)
        .exec(function(err, post) {
            if (err) {
                console.log(err);
                return;
            }

            Post.model.find()
                .where('hot', true)
                .exec(function(err, hot_posts) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    
                    view.render('blog', {posts: [post], hot_posts: hot_posts});
                });
        });
}