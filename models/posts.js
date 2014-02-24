var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Post = new keystone.List('Post', {
    autokey: {path: 'slug', from: 'title', unique: true},
    map: {name: 'title'},
    defaultSort: '-createdAt'
});

Post.add({
    title: {type: String, required: true},
    state: {type: Types.Select, options: 'draft, published, archived', default: 'draft', required: true},
    hot: {type: Types.Boolean, default: false},
    author: {type: Types.Relationship, ref: 'User'},
    createdAt: {type: Types.Datetime, default: Date.now},
    publishedAt: {type: Types.Datetime, default: Date.now},
    image: {type: Types.CloudinaryImage},    
    content: {
        brief: {type: Types.Html, wysiwyg: true, height: 150},
        extended: {type: Types.Html, wysiwyg: true, height: 400}
    }
});

Post.defaultColumns = 'title, state|20%, author, publishedAt|15%';
 
Post.schema.methods.isPublished = function() {
    return this.state == 'published';
}

Post.schema.pre('save', function(next) {
    if (this.isModified('state') && this.isPublished() && !this.publishedAt) {
        this.publishedAt = new Date();
    }
    next();
});

Post.register();