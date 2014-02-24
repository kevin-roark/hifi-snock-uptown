var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Archive = new keystone.List('Archive', {
    autokey: {path: 'slug', from: 'title', unique: true},
    map: {name: 'title'},
    defaultSort: '-createdAt'
});

var ArchiveMedia = new keystone.List('ArchiveMedia', {

});

Archive.add({
    title: {type: String, required: true},
    createdAt: {type: Types.Datetime, default: Date.now},   
    images: {type: Types.CloudinaryImages},
    description: {type: Types.Html, wysiwyg: true, height: 300}
});

ArchiveMedia.add({
    archive: {type: Types.Relationship, ref: 'Archive'},
    type: {type: Types.Select, options: 'audio, video', default: 'audio', required: true},
    caption: {type: String},
    url: {type: Types.Url},
    embedly: {type: Types.Embedly, from: 'url'}
});

Archive.relationship({
    path: 'medias',
    ref: 'ArchiveMedia',
    refPath: 'archive'
});

Archive.defaultColumns = 'title, createdAt';

ArchiveMedia.defaultColumns = 'archive, caption';

Archive.register();
ArchiveMedia.register();