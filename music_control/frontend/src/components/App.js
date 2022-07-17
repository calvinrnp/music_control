import React, { Component } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from "./HomePage";
import CreateRoomPage from "./CreateRoomPage";
import JoinRoomPage from "./JoinRoomPage";
import Room from "./Room";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Routes>
          <Route path="/create" element={<CreateRoomPage />} />
          <Route path="/join" element={<JoinRoomPage />} />
          <Route path="/room/:roomCode" element={<Room />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    );
  }
}

const appDiv = document.getElementById("app");
const root = createRoot(appDiv)
root.render(<App />);
