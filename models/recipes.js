var keystone = require('keystone');
var Types = keystone.Field.Types;

var Recipe = new keystone.List('Recipe', {
    autokey: {path: 'slug', from: 'name', unique: true},
    defaultSort: '-createdAt'
});

Recipe.add({
    name: {type: String, required: true},
    headerImage: {type: Types.CloudinaryImage},
    otherImages: {type: Types.CloudinaryImages},
    createdAt: {type: Types.Datetime, default: Date.now},
    ingredients: {type: Types.Html, wysiwyg: true, height: 200},
    instructions: {type: Types.Html, wysiwyg: true, height: 200},
    author: {type: Types.Relationship, ref: 'User'}
});

Recipe.defaultColumns = 'name, createdAt';

Recipe.register();