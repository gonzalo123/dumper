var CONF = {
        IO: {HOST: '0.0.0.0', PORT: 8888},
        EXPRESS: {HOST: '0.0.0.0', PORT: 26300}
    },
    express = require('express'),
    expressApp = express(),
    server = require('http').Server(expressApp),
    io = require('socket.io')(server, {origins: 'localhost:*'})
    ;

expressApp.get('/:type/:session/:message', function (req, res) {
    console.log(req.params);
    var session = req.params.session,
        type = req.params.type,
        message = req.params.message;

    io.sockets.emit('dumper.' + session, {title: type, data: JSON.parse(message)});
    res.json('OK');
});

io.sockets.on('connection', function (socket) {
    console.log("Socket connected!");
});

expressApp.listen(CONF.EXPRESS.PORT, CONF.EXPRESS.HOST, function () {
    console.log('Express started');
});

server.listen(CONF.IO.PORT, CONF.IO.HOST, function () {
    console.log('IO started');
});