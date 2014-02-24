var keystone = require('keystone');
var Event = keystone.list('Event');
 
exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res);
    Event.model.find()
        .sort('-startTime')
        .exec(function(err, events) {
            if (err) {
                console.log(err);
                return;
            }

            view.render('events', {events: events});
        });
}