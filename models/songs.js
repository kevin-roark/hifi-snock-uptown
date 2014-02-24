var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Song = new keystone.List('Song', {

});

Song.add({
    file: {type: Types.S3File},
    name: {type: String, required: true},
    artist: {type: String},
    album: {type: String}
});

Song.defaultColumns = 'name, artist, album';

Song.register();