let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

let PORT = 3001;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
});

http.listen(3001, function(){
    console.log('listening on *:3000');
});