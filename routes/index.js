var keystone = require('keystone'),
    middleware = require('./middleware'),
    importRoutes = keystone.importer(__dirname);
 
// Common Middleware
keystone.pre('routes', middleware.initErrorHandlers);
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);
 
// Handle 404 errors
keystone.set('404', function(req, res, next) {
    res.notfound('File not found', "Sorry! Couldn't find that!");
});
 
// Handle other errors
keystone.set('500', function(err, req, res, next) {
    var title = '500 Error';
    var message = '???';
    if (err instanceof Error) {
        message = err.message;
        err = err.stack;
    }
    res.err(err, title, message);
});
 
// Load Routes
var routes = {
    views: importRoutes('./views')
};
 
// Bind Routes
exports = module.exports = function(app) {
    app.get('/', routes.views.index);

    app.get('/events', routes.views.events);
    app.get('/events/:slug', routes.views.event);

    app.get('/blog', routes.views.blog);
    app.get('/blog/:slug', routes.views.post);

    app.get('/archives', routes.views.archives);
    app.get('/archives/:slug', routes.views.archive);

    app.get('/recipes', routes.views.recipes);
    app.get('/recipes/:slug', routes.views.recipe);

    app.get('/about', routes.views.about);
}