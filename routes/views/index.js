var keystone = require('keystone');
var FrontPageEvent = keystone.list('FrontPageEvent'); 
var Archive = keystone.list('Archive');
var Post = keystone.list('Post');
var Song = keystone.list('Song');

exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res);

    var queryCount = 0;
    var totalQueries = 4;
    var fpe, hp, chives, song;

    /* the flyer */
    FrontPageEvent.model.findOne()
        .populate('event')
        .exec(function(err, ev) {
            if (err) {
                console.log(err);
                return;
            }

            fpe = ev.event;
            renderer();
        });

    /* archive sidebar */
    Archive.model.find()
        .limit(3)
        .exec(function(err, archives) {
            if (err) {
                console.log(err);
                return;
            }

            chives = archives;
            renderer();
        });

    /* random hot post sidebar */
    Post.model.count(function(err, count) {
        if (err) {
            console.log(err);
            return;
        }
        var rand = Math.floor(Math.random() * count);
        Post.model.findOne()
            .skip(rand)
            .exec(function(err, post) {
                if (err) {
                    console.log(err);
                    return;
                }
                hp = post;
                renderer();
            });
    });

    /* random song for front page */
    Song.model.count(function(err, count) {
        if (err) {
            console.log(err);
            return;
        }
        var rand = Math.floor(Math.random() * count);
        Song.model.findOne()
            .skip(rand)
            .exec(function(err, s) {
                if (err) {
                    console.log(err);
                    return;
                }
                song = s;
                renderer();
            });
    });

    function renderer() {
        queryCount++;
        if (queryCount >= totalQueries) {
            view.render('index', {event: fpe, song: song, hot_post: hp, snock_chives: chives});
        }
    }
}