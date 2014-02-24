var keystone = require('keystone');
keystone.init({
  'name': 'Hi Fi Snock Uptown',
  'brand': 'Hi Fi Snock Uptown // weird cave',
  
  'favicon': 'public/favicon.ico',
  'less': 'public',
  'static': 'public',
  
  'views': 'templates/views',
  'view engine': 'jade',
  
  'auto update': true,
  'mongo': 'mongodb://localhost/hifi-snock-uptown',
  
  'session': true,
  'auth': true,
  'user model': 'User',
  'cookie secret': 'a cool secret cookie'
}); 
keystone.set('cloudinary config', {
  cloud_name: 'hi-fi-snock-uptown',
  api_key: 'api key',
  api_secret: 'secret key'
});
keystone.set('embedly api key', 'api key');
keystone.set('s3 config', {bucket: 'buck name', key: 'aws key', secret: 'aws secret'});

require('./models');
 
keystone.set('routes', require('./routes'));

var io = require('socket.io');
var connected = 0;
var recentMessages = [];

keystone.start(function() {
  io = io.listen(keystone.httpServer);

  io.sockets.on('connection', function(socket) {
    connected++;
    io.sockets.emit('connCount', connected);
    socket.emit('recentMsgs', recentMessages);

    socket.on('message', function(data) {
      io.sockets.emit('message', data);

      recentMessages.push(data);
      if (recentMessages.length > 15)
        recentMessages.shift();
    });

    socket.on('disconnect', function() {
      connected--;
      io.sockets.emit('connCount', connected);
    });

  });

});
