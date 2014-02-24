var keystone = require('keystone');
var Post = keystone.list('Post');
 
exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res);

    Post.model.find()
        .where('state', 'published')
        .populate('author')
        .sort('-publishedAt')
        .limit(7)
        .exec(function(err, posts) {
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
                    view.render('blog', {posts: posts, hot_posts: hot_posts});
                });
        });
}