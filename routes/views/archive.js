var keystone = require('keystone');
var Archive = keystone.list('Archive');
var ArchiveMedia = keystone.list('ArchiveMedia');
var _ = require('underscore');
 
exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res);
    Archive.model.findOne()
        .where('slug', req.params.slug)
        .exec(function(err, arc) {
            if (err) {
                console.log(err);
                return;
            }

            ArchiveMedia.model.find().where('archive', arc.id).exec(function(err, medias) {
                if (err) {
                    console.log(err);
                    return;
                }

                var sounds = _.filter(medias, function(media) {
                    return media.type == 'audio';
                });
                var vids = _.filter(medias, function(media) {
                    return media.type == 'video';
                });

                for (var i=0; i<sounds.length; i++) {
                    sounds[i].embedly.html = 
                        embedlyClassReplace(sounds[i].embedly.html, "archive-audio-embed");
                }

                for (var i=0; i<vids.length; i++) {
                    vids[i].embedly.html =
                        embedlyClassReplace(vids[i].embedly.html, "archive-video-embed");
                }

                view.render('archive', {archive: arc, audios: sounds, videos: vids});
            });

        });
}

function embedlyClassReplace(html, newClass) {
    return html.replace('class="embedly-embed"', 
            'class="embedly-embed ' + newClass + '"');
}