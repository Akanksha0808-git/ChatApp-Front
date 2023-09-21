import React, { useState, useEffect } from 'react';
import './App.css';
import io from 'socket.io-client';

const newSocket = io('https://akanksharma-chitchat-node5handson.onrender.com');
const inputUsername = prompt('Enter your username:');

function App() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    newSocket.on('chatMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    setSocket(newSocket);
  }, []);

  const handleSendMessage = () => {

      socket.emit('chatMessage', `${username}: ${message}`);
      setMessage('');
  
  };

  return (
    <div className="App">
      <div className="header">
       <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu8wTQfQbApFJ2aLLq4tyaGRdpIARwk7uZkQ&usqp=CAU' height="50px" width="50px" alt='img here' className='image'></img>
       
          <h2>{inputUsername}</h2>
      
        <p>Welcome, {inputUsername}!</p>
      </div>
      <div className="chat">
        <div className="chat-window">
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className="message">
                {msg}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className='btn' onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
