var keystone = require('keystone');
var Event = keystone.list('Event');
 
exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res);
    Event.model.findOne()
        .where('slug', req.params.slug)
        .exec(function(err, ev) {
            if (err) {
                console.log(err);
                return;
            }

            Event.model.find()
                .where('slug').ne(req.params.slug)
                .sort('-startTime')
                .exec(function(err, evs) {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    evs.unshift(ev);
                    view.render('events', {events: evs});
                });
        });
}