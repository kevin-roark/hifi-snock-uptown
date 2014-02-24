var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Event = new keystone.List('Event', {
    autokey: {path: 'slug', from: 'name', unique: true},
    defaultSort: '-startTime'
});

Event.add({
    name: {type: String, required: true},
    createdAt: {type: Types.Datetime, default: Date.now},
    startTime: {type: Types.Datetime, required: true, default: Date.now},
    endTime: {type: Types.Datetime},
    image: {type: Types.CloudinaryImage},
    description: {type: Types.Html, wysiwyg: true, height: 300}
});

Event.defaultColumns = 'name, startTime';

Event.schema.methods.hasHappened = function() {
    return Date.now() >= this.endTime;
}

Event.register();

var FrontPageEvent = new keystone.List('FrontPageEvent', {

});

FrontPageEvent.add({
    event: {type: Types.Relationship, ref: 'Event'}
});

FrontPageEvent.register();