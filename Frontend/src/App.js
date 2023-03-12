import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Components/Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join a Chat</h3>
          <label>Name</label>
          <input
            type="text"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <label>Room Id</label>

          <input
            type="text"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Start a chat</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
