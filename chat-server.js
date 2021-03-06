PORT      = process.env.PORT || 5001;
REDIS_URL = process.env.REDIS_URL || null;
CHANNEL   = 'messages';

console.log('Node Server Running... | PORT: ' + PORT);

var options = {
  url: REDIS_URL
};

function InitializeServer() {
  var io = require('socket.io').listen(PORT);
  var redis = require('redis').createClient(options);

  redis.subscribe(CHANNEL);

  io.on('connection', function(socket){
    console.log('connected socket');

    socket.on('disconnect', function(){
      socket.disconnect();
      console.log('client disconnected');
    });

    redis.on('message', function(channel, message){
      socket.emit(channel, message);
      console.log('emit message: ' + message);
    });
  });
}

InitializeServer();
