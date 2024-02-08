
const socket = io('http://localhost:8000');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

const username = prompt("Enter your name to join");
console.log("Username:", username);
socket.emit('new-user-joined', username);
var audio = new Audio("assets/samsung_notifications.mp3");
			
const append =(message,position)=>{
    const messageElement =document.createElement('div');
    messageElement.innerText =message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    

}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message =messageInput.value;
    append(`You : ${message}`,'right');
    socket.emit('send',message);
    messageInput.value='';
})
socket.on('user-joined',username=>{
    append(`${username} joined the chat`,'left');audio.play();
})
socket.on('receive',data=>{
    if (data.username !== username) {
        append(`${data.username} : ${data.message}`, 'left');audio.play();
    }
})
socket.on('user-disconnected', username => {
    append(`${username} has been disconnected from the chat`, 'left');
})