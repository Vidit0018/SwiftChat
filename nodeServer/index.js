// const io = require ('socket.io')(8000)
// const users ={}

// io.on('connection', socket =>{
//     socket.on('new-user-joined', username =>{
//         console.log("new user",username);
//         users[socket.id] =username;
//         socket.broadcast.emit('user-joined',username);
//     });
//     socket.on('send', message =>{
//         socket.broadcast.emit('receive' ,{ message : message , username: users[socket.id]})
//     });
// })
const io = require('socket.io')(8000, {
    cors: {
      origin: "http://127.0.0.1:5500",
      methods: ["GET", "POST"]
    }
  });
  

const users = {};


    io.on('connection', socket => {
        // console.log('A user connected');
    
        socket.on('new-user-joined', username => {
            // console.log("New user joined:", username);
            if (!username) {
                console.log("Empty username received!");
                return;
            }
            users[socket.id] = username;
            socket.broadcast.emit('user-joined', username);
        });
    

    socket.on('send', message => {
        io.emit('receive', { message: message, username: users[socket.id] });
    });
    socket.on('disconnect', () => {
        const disconnectedUser = users[socket.id];
        delete users[socket.id];
        io.emit('user-disconnected', disconnectedUser);
        // console.log(`${disconnectedUser} disconnected from the chat`);
    });
});
