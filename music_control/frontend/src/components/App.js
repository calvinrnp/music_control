import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./HomePage";
import CreateRoomPage from "./CreateRoomPage";
import JoinRoomPage from "./JoinRoomPage";
import Room from "./Room";

export default function App(props) {
  const [roomCode, setRoomCode] = useState(null);

  const handleInRoom = async () => {
    const token = await fetch("/api/user-in-room")
      .then((response) => response.json())
      .then((data) => setRoomCode(data.code));
  };
  
  handleInRoom();

  function handleLeaveRoom() {
    setRoomCode(null);
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={ roomCode ? <Navigate to={`/room/${roomCode}`} /> : <HomePage /> } />
        <Route path="/create" element={<CreateRoomPage />} />
        <Route path="/join" element={<JoinRoomPage />} />
        <Route path="/room/:roomCode" element={<Room leaveRoomCallback={handleLeaveRoom} />} />
      </Routes>
    </Router>
  );
}

const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(<App />);
